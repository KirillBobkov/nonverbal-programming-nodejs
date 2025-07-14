import { ICreatePayment, Payment, Refund } from "@a2seven/yoo-checkout";
import { v4 as uuidv4 } from "uuid";
import { YouKassa } from "../config/yookassa";

const priceMap = {
  // base: "4990",
  // optimal: "13990",
  // premium: "99990",
  base: "2",
  optimal: "2",
  premium: "2",
};

// Формирование данных для платежа
const createPaymentPayload = (body: {
  name: string;
  email: string;
  phone: string;
  tariff: "base" | "optimal" | "premium";
}): ICreatePayment => {
  return {
    amount: {
      value: priceMap[body.tariff] ?? "4990",
      currency: "RUB",
    },
    payment_method_data: {
      type: "bank_card",
    },
    capture: true,
    confirmation: {
      type: "redirect",
      return_url: "https://alexandrvasilev.ru/nonverbal-programming?paid=1",
    },
    metadata: {
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      tariff: body.tariff || "Нет тарифа",
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
            value: priceMap[body.tariff] ?? "4990",
            currency: "RUB",
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
  tariff: "base" | "optimal" | "premium";
}) => {
  const payment = await YouKassa.createPayment(
    createPaymentPayload(body),
    uuidv4()
  );
  return payment;
};

export const isPaymentSucceededNotification = (
  body: unknown
): body is { type: string; event: string; object: Payment } => {
  return Boolean(
    body &&
      typeof body === "object" &&
      body !== null &&
      "type" in body &&
      "event" in body &&
      "object" in body &&
      body.type === "notification" &&
      body.event === "payment.succeeded" &&
      body.object &&
      typeof body.object === "object" &&
      "id" in body.object &&
      "metadata" in body.object &&
      body.object.metadata !== null &&
      typeof body.object.metadata === "object" &&
      "email" in body.object.metadata
  );
};

export const isPaymentWaitingForCaptureNotification = (
  body: unknown
): body is { type: string; event: string; object: Payment } => {
  return Boolean(
    body &&
      typeof body === "object" &&
      body !== null &&
      "type" in body &&
      "event" in body &&
      "object" in body &&
      body.type === "notification" &&
      body.event === "payment.waiting_for_capture" &&
      body.object &&
      typeof body.object === "object"
  );
};

export const isPaymentCanceledNotification = (
  body: unknown
): body is { type: string; event: string; object: Payment } => {
  return Boolean(
    body &&
      typeof body === "object" &&
      body !== null &&
      "type" in body &&
      "event" in body &&
      "object" in body &&
      body.type === "notification" &&
      body.event === "payment.canceled" &&
      body.object &&
      typeof body.object === "object"
  );
};

export const isRefundSucceededNotification = (body: unknown): body is { type: string; event: string; object: Refund } => {
  return Boolean(
      body &&
      typeof body === "object" &&
      body !== null &&
      "type" in body &&
      "event" in body &&
      "object" in body &&
      body.type === "notification" &&
      body.event === "refund.succeeded" &&
      body.object
  );
};

// Валидация webhook для платежей
export const validatePaymentWebhook = (
  body: any
): body is { type: string; event: string; object: Payment } => {
  return Boolean(
    body &&
      body?.type === "notification" &&
      body.object?.id &&
      body.object?.amount?.value &&
      body.object?.amount?.currency &&
      body.object?.metadata?.email
  );
};
// Валидация webhook для возвратов
export const validateRefundWebhook = (
  body: unknown
): body is { type: string; event: string; object: Refund } => {
  return Boolean(
    body &&
      typeof body === "object" &&
      body !== null &&
      "type" in body &&
      "event" in body &&
      "object" in body &&
      body.type === "notification" &&
      body.event === "refund.succeeded" &&
      body.object &&
      typeof body.object === "object" &&
      "id" in body.object &&
      "amount" in body.object &&
      typeof body.object.amount === "object" &&
      body.object.amount !== null &&
      "currency" in body.object.amount &&
      body.object.amount.currency !== null &&
      "payment_id" in body.object
  );
};
