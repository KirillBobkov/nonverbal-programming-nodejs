import { ICreatePayment, ICreateReceipt, Payment, Refund, IReceipt } from "@a2seven/yoo-checkout";
import { v4 as uuidv4 } from "uuid";
import { YouKassa } from "../config/yookassa";

export const COURSE_PRICE = "5990";
export const COURSE_CURRENCY = "RUB";
export const RETURN_URL = process.env.RETURN_URL || "https://alexandrvasilev.ru/nonverbal-programming?paid=1"; 

// Формирование данных для платежа
const createPaymentPayload = (body: {
  name: string;
  email: string;
  phone: string;
}): ICreatePayment => {
  return {
    amount: {
      value: COURSE_PRICE,
      currency: COURSE_CURRENCY,
    },
    payment_method_data: {
      type: "bank_card",
    },
    capture: true,
    confirmation: {
      type: "redirect",
      return_url: RETURN_URL,
    },
    metadata: {
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
    },
    receipt: {
      customer: {
        email: body.email,
        full_name: body.name,
        phone: body.phone,
      },
      items: [
        {
          description: "Невербальное программирование (курс из 12 видеоуроков)",
          quantity: "1",
          amount: {
            value: COURSE_PRICE,
            currency: COURSE_CURRENCY,
          },
          vat_code: 1,
        },
      ],
      phone: body.phone,
      email: body.email,
    },
  };
};

// Создание платежа
export const processPayment = async (body: {
  name: string;
  email: string;
  phone: string;
}) => {
  const payment = await YouKassa.createPayment(createPaymentPayload(body), uuidv4());
  return payment;
};

export const isPaymentSucceededNotification = (body: unknown): body is { type: string; event: string; object: Payment } => {
  return Boolean(
    Boolean(body) &&
    typeof body === 'object' && body !== null &&
    'type' in body &&
    'event' in body &&
    'object' in body &&
    body.type === "notification" &&
    body.event === "payment.succeeded" &&
    body.object &&
    typeof body.object === 'object'
  );
};

export const isPaymentWaitingForCaptureNotification = (body: unknown): body is { type: string; event: string; object: Payment } => {
  return Boolean(
    Boolean(body) &&
    typeof body === 'object' && body !== null &&
    'type' in body &&
    'event' in body &&
    'object' in body &&
    body.type === "notification" &&
    body.event === "payment.waiting_for_capture" &&
    body.object &&
    typeof body.object === 'object'
  );
};

export const isPaymentCanceledNotification = (body: unknown): body is { type: string; event: string; object: Payment } => {
  return Boolean(
    Boolean(body) &&
    typeof body === 'object' && body !== null &&
    'type' in body &&
    'event' in body &&
    'object' in body &&
    body.type === "notification" &&
    body.event === "payment.canceled" &&
    body.object &&
    typeof body.object === 'object'
  );
};

export const isRefundSucceededNotification = (body: any): boolean => {
  return (
    body.type === "notification" &&
    body.event === "refund.succeeded" &&
    body.object
  );
};

// Валидация webhook для платежей
export const validatePaymentWebhook = (body: any): body is { type: string; event: string; object: Payment } => {
  if (!body || body.type !== "notification" || !body.object) {
    return false;
  }

  const paymentObject = body.object;
  
  // Проверяем наличие обязательных полей для объекта платежа
  const hasRequiredFields = 
    paymentObject.id &&
    paymentObject.amount &&
    paymentObject.amount.value &&
    paymentObject.amount.currency;

  // Для платежей проверяем metadata
  const hasMetadata = 
    paymentObject.metadata &&
    paymentObject.metadata.email;

  return hasRequiredFields && hasMetadata;
};

// Валидация webhook для возвратов
export const validateRefundWebhook = (body: any): body is { type: string; event: string; object: Refund } => {
  if (!body || body.type !== "notification" || !body.object || body.event !== "refund.succeeded") {
    return false;
  }

  const refundObject = body.object;
  
  // Проверяем наличие обязательных полей для объекта возврата
  const hasRequiredFields = 
    refundObject.id &&
    refundObject.amount &&
    refundObject.amount.value &&
    refundObject.amount.currency &&
    refundObject.payment_id;

  return hasRequiredFields;
}; 