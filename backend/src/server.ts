import express from "express";
import config from "./constants/index.js";
import authRoutes from "./routes/auth.js";
import analyticRoutes from "./routes/analytics.js";
import urlRoutes from "./routes/urls.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import useragent from "express-useragent";
import expressip from "express-ip";

import "./middleware/passport-middleware.js";
import { swaggerDocs } from "./utils/swagger.js";

const app = express(); // Middleware to extract user agent information
app.use(useragent.express());
app.use(expressip().getIpInfoMiddleware);

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

swaggerDocs(app, 8000);

app.use("/api", authRoutes);
app.use("/api/analytics", analyticRoutes);
app.use("/api/url", urlRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The server is listening at PORT : ${config.PORT}`);
});
