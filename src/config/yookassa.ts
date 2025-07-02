import { YooCheckout } from "@a2seven/yoo-checkout";
import logger from "./logger";

export const YouKassa = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID || "1112707",
  secretKey: process.env.YOOKASSA_SECRET_KEY || "test_OBes7TG_FtarOiyc2rYNaHxpo8UNzyEKyJOP-TWmDK4",
});

if (!process.env.YOOKASSA_SHOP_ID || !process.env.YOOKASSA_SECRET_KEY) {
  logger.warn("Используются тестовые ключи YooKassa — задайте YOOKASSA_SHOP_ID/YOOKASSA_SECRET_KEY для продакшена");
} 