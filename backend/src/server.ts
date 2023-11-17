import express from "express";
import config from "./constants/index.js";
import authRoutes from "./routes/auth.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use("/api", authRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The server is listening at PORT : ${config.PORT}`);
});
