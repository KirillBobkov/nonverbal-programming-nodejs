import { YooCheckout } from "@a2seven/yoo-checkout";

export const YouKassa = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID || "1112707",
  secretKey: process.env.YOOKASSA_SECRET_KEY || "test_OBes7TG_FtarOiyc2rYNaHxpo8UNzyEKyJOP-TWmDK4",
}); 