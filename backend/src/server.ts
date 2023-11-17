import express from "express";
import config from "./constants/index.js";
import authRoutes from "./routes/auth.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";

import "./middleware/passport-middleware.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api", authRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The server is listening at PORT : ${config.PORT}`);
});
