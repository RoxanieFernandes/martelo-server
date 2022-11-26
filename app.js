import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import handleError from "./error-handling/index.js";
import authRoutes from "./routes/auth.routes.js";
import authMiddleWare from "./middleware/auth.middleware.js";

import connect from "./db/index.js";
connect();

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use("/", authRoutes);

app.use(authMiddleWare);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Está funcionando" });
});

handleError(app);

export default app;
