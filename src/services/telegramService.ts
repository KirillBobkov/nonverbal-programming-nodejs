import { Payment, Refund } from "@a2seven/yoo-checkout";
import logger from "../config/logger";

/**
 * Отправка сообщения в Telegram.
 *  – Возвращает true при успехе, false при любой ошибке или отсутствии credentials.
 *  – Никогда не выбрасывает исключение, чтобы не ронять event-loop.
 */
const sendTelegramMessage = async (text: string): Promise<boolean> => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

  // Если переменные окружения не заданы – просто логируем и выходим.
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    logger.warn(
      "Telegram уведомления отключены – отсутствуют TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID"
    );
    return false;
  }

  const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        parse_mode: "html",
        text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Telegram API error: ${response.status} - ${errorData}`);
    }

    logger.debug("Telegram сообщение отправлено успешно");
    return true;
  } catch (error: any) {
    logger.error("Ошибка отправки Telegram сообщения", { error: error.message });
    return false; // Не пробрасываем ошибку – избежим unhandledRejection
  }
};

export const sendPaymentSuccessNotification = async (
  paymentObject: Payment, 
  emailStatus?: { success: boolean, message: string }
) => {
  const text = `🎉 <b>УСПЕШНАЯ ОПЛАТА</b>

💰 <b>Сумма</b>: ${paymentObject.amount?.value ?? '—'} ${paymentObject.amount?.currency ?? ''}
📧 <b>Email</b>: ${paymentObject.metadata?.email || 'Не указан'}
👤 <b>Имя</b>: ${paymentObject.metadata?.name || 'Не указано'}
📞 <b>Телефон</b>: ${paymentObject.metadata?.phone || 'Не указан'}
💰 <b>Тариф</b>: ${paymentObject.metadata?.tariff || 'Нет тарифа'}
🆔 <b>ID платежа</b>: ${paymentObject.id}
⏰ <b>Время</b>: ${new Date().toLocaleString('ru-RU')}
🧾 <b>Статус чека</b>: ${(() => {
  switch (paymentObject.receipt_registration) {
    case 'pending':
      return 'Ожидает регистрации';
    case 'succeeded':
      return 'Зарегистрирован';
    case 'canceled':
      return 'Отменен';
    default:
      return 'Статус неизвестен';
  }
})()}
📩 <b>Письмо с материалами курса</b>: ${emailStatus ? (emailStatus.success ? '✅ Отправлено' : `❌ Не отправлено: ${emailStatus.message}. Нужно связаться и уточнить получили ли письмо.`) : '❌ Не отправлено'}`;

  await sendTelegramMessage(text);
};

export const sendPaymentWaitingNotification = async (paymentObject: Payment) => {
  const text = `⏳ <b>ПЛАТЁЖ ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ</b>

💰 <b>Сумма</b>: ${paymentObject.amount?.value ?? '—'} ${paymentObject.amount?.currency ?? ''}
📧 <b>Email</b>: ${paymentObject.metadata?.email || 'Не указан'}
👤 <b>Имя</b>: ${paymentObject.metadata?.name || 'Не указано'}
📞 <b>Телефон</b>: ${paymentObject.metadata?.phone || 'Не указан'}
💰 <b>Тариф</b>: ${paymentObject.metadata?.tariff || 'Нет тарифа'}
🆔 <b>ID платежа</b>: ${paymentObject.id}
⏰ <b>Время</b>: ${new Date().toLocaleString('ru-RU')}

⚠️ Требует ручного подтверждения`;

  await sendTelegramMessage(text);
};

export const sendPaymentCanceledNotification = async (paymentObject: Payment) => {
  const text = `❌ <b>ПЛАТЁЖ ОТМЕНЁН</b>

💰 <b>Сумма</b>: ${paymentObject.amount?.value ?? '—'} ${paymentObject.amount?.currency ?? ''}
📧 <b>Email</b>: ${paymentObject.metadata?.email || 'Не указан'}
👤 <b>Имя</b>: ${paymentObject.metadata?.name || 'Не указано'}
📞 <b>Телефон</b>: ${paymentObject.metadata?.phone || 'Не указан'}
💰 <b>Тариф</b>: ${paymentObject.metadata?.tariff || 'Нет тарифа'}
🆔 <b>ID платежа</b>: ${paymentObject.id}
⏰ <b>Время</b>: ${new Date().toLocaleString('ru-RU')}

🚫 <b>Причина</b>: ${(() => {
  const reason = paymentObject.cancellation_details?.reason;
  if (!reason) return 'Не указана';
  
  const reasons: Record<string, string> = {
    '3d_secure_failed': 'Не пройдена аутентификация по 3-D Secure',
    'call_issuer': 'Оплата отклонена банком',
    'canceled_by_merchant': 'Платеж отменен продавцом',
    'card_expired': 'Истек срок действия карты',
    'country_forbidden': 'Карта выпущена в неподдерживаемой стране',
    'deal_expired': 'Истек срок сделки',
    'expired_on_capture': 'Истек срок списания оплаты',
    'expired_on_confirmation': 'Истек срок подтверждения платежа',
    'fraud_suspected': 'Подозрение в мошенничестве',
    'general_decline': 'Общий отказ',
    'identification_required': 'Требуется идентификация',
    'insufficient_funds': 'Недостаточно средств',
    'internal_timeout': 'Технический сбой',
    'invalid_card_number': 'Неверный номер карты',
    'invalid_csc': 'Неверный код CVV',
    'issuer_unavailable': 'Банк недоступен',
    'payment_method_limit_exceeded': 'Исчерпан лимит платежей',
    'payment_method_restricted': 'Платежное средство заблокировано',
    'permission_revoked': 'Отозвано разрешение на автоплатежи',
    'unsupported_mobile_operator': 'Неподдерживаемый мобильный оператор'
  };
  
  return reasons[reason] || reason;
})()}
👤 Инициатор: ${
  paymentObject.cancellation_details?.party === 'merchant' ? 'Продавец (мы)' :
  paymentObject.cancellation_details?.party === 'yoo_money' ? 'ЮKassa' :
  paymentObject.cancellation_details?.party === 'payment_network' ? 'Платежная сеть (эмитент, сторонний сервис)' :
  paymentObject.cancellation_details?.party || 'Не указан'
}`;

  await sendTelegramMessage(text);
};

export const sendRefundSucceededNotification = async (refundObject: Refund) => {
  const text = `💸 <b>УСПЕШНЫЙ ВОЗВРАТ</b>

💰 <b>Сумма возврата</b>: ${refundObject.amount?.value ?? '—'} ${refundObject.amount?.currency ?? ''}
🆔 <b>ID возврата</b>: ${refundObject.id}
🔗 <b>ID платежа</b>: ${refundObject.payment_id}
⏰ <b>Время</b>: ${new Date().toLocaleString('ru-RU')}

✅ Деньги возвращены покупателю`;

  await sendTelegramMessage(text);
}; 