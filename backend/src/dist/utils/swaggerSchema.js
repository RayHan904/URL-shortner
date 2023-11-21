export {};
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
//# sourceMappingURL=swaggerSchema.js.map