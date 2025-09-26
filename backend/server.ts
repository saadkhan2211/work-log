require("dotenv").config();
import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import http from "http";
import { connectDB } from "./configs/mongo";
import { CLIENT_URL, PORT } from "./configs/envs";

import authRoute from "./routes/authRoute";

const app = express();
const server = http.createServer(app);
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

async function start() {
  try {
    await connectDB();

    app.use(express.json({ limit: "50mb" }));
    app.use(
      cors({
        origin: CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );
    app.use(limiter);

    app.use((req: Request, res: Response, next) => {
      console.log(`[${req.method}] ${req.path}`);
      next();
    });

    app.use("/api/auth", authRoute);

    server.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
