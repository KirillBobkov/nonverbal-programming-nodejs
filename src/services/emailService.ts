import { transporter } from "../config/email";
import logger from "../config/logger";
import { baseEmail, optimalEmail, premiumEmail } from "../helpers/email-templates";

export interface EmailResult {
  success: boolean;
  message: string;
}

export const sendCourseEmail = (
  email: string,
  tariff: "base" | "premium" | "optimal" = "base"
): Promise<EmailResult> => {
  // Пустой email → нечего отправлять
  if (!email) {
    logger.warn("sendCourseEmail вызван без email");
    return Promise.resolve({ success: false, message: "Email not provided" });
  }

  console.log('tariff', tariff) 
  let htmlContent: string = baseEmail;
  if (tariff === "optimal") {
    htmlContent = optimalEmail;
  } else if (tariff === "premium") {
    htmlContent = premiumEmail;
  }

  const emailPromise = new Promise<EmailResult>((resolve) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "НЕВЕРБАЛЬНОЕ ПРОГРАММИРОВАНИЕ (Курс из 16 видеоуроков)",
        html: htmlContent,
      },
      (error: Error | null, info: any) => {
        if (error) {
          logger.error("Ошибка отправки письма", {
            error: error?.message,
            email,
          });
          resolve({
            success: false,
            message: error?.message || "Ошибка отправки письма",
          });
        } else {
          logger.info("Письмо с курсом отправлено успешно", {
            email,
            messageId: info?.messageId,
          });
          resolve({ success: true, message: "Письмо успешно отправлено" });
        }
      }
    );
  });

  // Если за 20 сек. ничего не произошло – считаем неуспехом, но не бросаем.
  const timeoutPromise = new Promise<EmailResult>((resolve) => {
    setTimeout(() => {
      resolve({
        success: false,
        message: "Истекло время ожидания отправки письма",
      });
    }, 15000);
  });

  return Promise.race([emailPromise, timeoutPromise]);
};
