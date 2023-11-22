import express from "express";
import constants from "./constants/index.js";
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
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(useragent.express());
app.use(expressip().getIpInfoMiddleware);

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

swaggerDocs(app, 8000);

/**
 * @swagger
 *  components:
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized. The user is not authenticated.
 *       content:
 *         application/json:
 *           example:
 *             success: false
 *             message: You are not authorized to access this resource.
 *     ForbiddenError:
 *       description: Forbidden. The user does not have sufficient privileges.
 *       content:
 *         application/json:
 *           example:
 *             success: false
 *             message: You do not have the necessary permissions to access this resource.
 *     ServerError:
 *       description: Internal Server Error.
 *       content:
 *         application/json:
 *           example:
 *             success: false
 *             message: Server Error
 *     NotFoundError:
 *       description: Not Found.
 *       content:
 *         application/json:
 *           example:
 *             success: false
 *             message: Resource not found.
 *            
 
 *
 *
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           example: 1
 *           description: Unique identifier for the user.
 *         email:
 *           type: string
 *           example: user@example.com
 *           description: Email address of the user.
 *         password_hash:
 *           type: string
 *           example: hashed_password
 *           description: Hashed password of the user.
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: '2022-01-01T00:00:00.000Z'
 *           description: Timestamp of user creation.
 *         is_admin:
 *           type: boolean
 *           example: false
 *           description: Indicates whether the user is an admin or not.
 *
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       properties:
 *         url_id:
 *           type: integer
 *           example: 1
 *           description: Unique identifier for the URL.
 *         original_url:
 *           type: string
 *           example: 'https://example.com'
 *           description: Original long URL.
 *         short_url_key:
 *           type: string
 *           example: 'abc123'
 *           description: Short key for the URL.
 *         user_id:
 *           type: integer
 *           example: 1
 *           description: Identifier of the user who created the URL.
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: '2022-01-01T00:00:00.000Z'
 *           description: Timestamp of URL creation.
 *         clicks:
 *           type: integer
 *           example: 0
 *           description: Number of clicks on the URL.
 *
 * @swagger
 * components:
 *   schemas:
 *     Analytics:
 *       type: object
 *       properties:
 *         analytics_id:
 *           type: integer
 *           example: 1
 *           description: Unique identifier for the analytics data.
 *         url_id:
 *           type: integer
 *           example: 1
 *           description: Identifier of the associated URL.
 *         request_timestamp:
 *           type: string
 *           format: date-time
 *           example: '2022-01-01T12:34:56.000Z'
 *           description: Timestamp of the analytics request.
 *         device_type:
 *           type: string
 *           example: 'Desktop'
 *           description: Type of device used for the request.
 *         os_type:
 *           type: string
 *           example: 'Windows'
 *           description: Operating system of the device.
 *         country:
 *           type: string
 *           example: 'United States'
 *           description: Country from which the request originated.
 *         city:
 *           type: string
 *           example: 'New York'
 *           description: City from which the request originated.
 *         browser_type:
 *           type: string
 *           example: 'Chrome'
 *           description: Type of browser used for the request.
 */

app.use("/api/users", authRoutes);
app.use("/api/analytics", analyticRoutes);
app.use("/api/url", urlRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server is listening at PORT : ${PORT}`);
});
