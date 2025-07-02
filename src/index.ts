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
app.use(express.json());

app.use("/api", paymentRoutes);

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Сервер запущен на http://localhost:${PORT}`);
});
