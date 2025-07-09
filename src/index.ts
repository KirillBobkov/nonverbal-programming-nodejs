import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/payment";
import logger from "./config/logger";

const app = express();
const PORT = Number(process.env.PORT) || 4001;


console.log(process.env.NODE_ENV);

app.use(
  cors({
    credentials: true,
    origin: ['https://alexandrvasilev.onrender.com', 'https://alexandrvasilev.ru']
  })
);

// Этот middleware парсит входящие запросы с Content-Type: application/json
// и делает их тело (body) доступным в req.body.
// Без него req.body в твоих роутах будет undefined.
app.use(express.json());

app.use("/api", paymentRoutes);

// Безопасные глобальные хендлеры – логируем необработанные ошибки, но не падаем.
process.on("unhandledRejection", (reason: any) => {
  logger.error("ГЛОБАЛЬНАЯ ОШИБКА: Unhandled Promise Rejection", { reason });
});

process.on("uncaughtException", (error: Error) => {
  logger.error("ГЛОБАЛЬНАЯ ОШИБКА: Uncaught Exception", { error: error.message, stack: error.stack });
});

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Сервер запущен на http://localhost:${PORT}`);
});
