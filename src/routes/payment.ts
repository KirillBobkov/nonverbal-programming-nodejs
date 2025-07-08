import { Request, Response, Router, RequestHandler } from "express";
import {
  processPayment,
  isPaymentSucceededNotification,
  isPaymentWaitingForCaptureNotification,
  isPaymentCanceledNotification,
  isRefundSucceededNotification,
  validatePaymentWebhook,
  validateRefundWebhook,
} from "../services/paymentService";
import { EmailResult, sendCourseEmail } from "../services/emailService";
import {
  sendPaymentSuccessNotification,
  sendPaymentWaitingNotification,
  sendPaymentCanceledNotification,
  sendRefundSucceededNotification,
} from "../services/telegramService";
import logger from "../config/logger";

const router = Router();

router.post("/payment", async (req: Request, res: Response) => {
  try {
    const payment = await processPayment(req.body);
    logger.info("Платеж создан", {
      paymentId: payment.id,
      email: req.body.email,
    });
    res.json({ payment });
  } catch (error) {
    logger.error("Ошибка создания платежа", { error, body: req.body });
    res.status(400).json({ error: "error" });
  }
});

router.post("/payment/notifications", async (req: any, res: any) => {
  logger.debug("Получено уведомление о платеже", {
    event: req.body.event,
    type: req.body.type,
  });

  // Проверяем, является ли это уведомлением о возврате
  if (isRefundSucceededNotification(req.body)) {
    if (!validateRefundWebhook(req.body)) {
      logger.error("Невалидная структура webhook для возврата", {
        body: req.body,
      });
      return res
        .status(400)
        .json({ error: "Invalid refund payload structure" });
    }

    const refundObject = req.body.object;
    logger.info("Успешный возврат", {
      refundId: refundObject.id,
      paymentId: refundObject.payment_id,
    });

    try {
      await sendRefundSucceededNotification(refundObject);
    } catch (error: any) {
      logger.error("Ошибка отправки уведомления о возврате", {
        error: error.message,
        refundId: refundObject.id,
      });
    }

    return res.json({ status: "OK" });
  }

  // Валидация структуры webhook для платежей
  if (!validatePaymentWebhook(req.body)) {
    logger.error("Невалидная структура webhook для платежа", {
      body: req.body,
    });
    return res.status(400).json({ error: "Invalid payment payload structure" });
  }

  // Успешный платёж
  if (isPaymentSucceededNotification(req.body)) {
    logger.info("Успешный платёж", {
      paymentId: req.body.object.id,
      email: req.body.object.metadata.email,
      amount: req.body.object.amount.value,
      tariff: req.body.object.metadata.tariff,
    });

    try {
      const emailStatus = await sendCourseEmail(
        req.body.object.metadata.email,
        req.body.object.metadata.tariff
      );
      // await sendPaymentSuccessNotification(req.body.object, emailStatus);
    } catch (error: any) {
      logger.error("Ошибка отправки уведомлений об успешном платеже", {
        error: error.message,
        paymentId: req.body.object.id,
      });
    }

    return res.json({ status: "OK" });

    // Платёж ожидает подтверждения
  } else if (isPaymentWaitingForCaptureNotification(req.body)) {
    logger.info("Платёж ожидает подтверждения", {
      paymentId: req.body.object.id,
    });

    try {
      await sendPaymentWaitingNotification(req.body.object);
    } catch (error: any) {
      logger.error(
        "Ошибка отправки уведомления о платеже ожидающем подтверждения",
        {
          error: error.message,
          paymentId: req.body.object.id,
        }
      );
    }

    return res.json({ status: "OK" });

    // Платёж отменён или ошибка
  } else if (isPaymentCanceledNotification(req.body)) {
    logger.warn("Платёж отменён", {
      paymentId: req.body.object.id,
      reason: req.body.object.cancellation_details?.reason,
    });

    try {
      await sendPaymentCanceledNotification(req.body.object);
    } catch (error: any) {
      logger.error("Ошибка отправки уведомления об отмене платежа", {
        error: error.message,
        paymentId: req.body.object.id,
      });
    }

    return res.json({ status: "OK" });

    // Неизвестный тип уведомления
  } else {
    logger.warn("Неизвестный тип уведомления", { event: req.body.event });
    return res.json({ status: "OK" });
  }
});

export default router;
