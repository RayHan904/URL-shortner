import express from "express";
import {
  getAllLinks,
  getLink,
  getUserLinks,
  shrink,
  redirect,
} from "../controllers/urlController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/get-all-links:
 *   get:
 *     summary: Get all shortened URLs.
 *     description: Retrieve a list of all shortened URLs. Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - URL Shortener
 *     responses:
 *       '200':
 *         description: Successful operation. Returns a list of shortened URLs.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: URLs retrieved successfully
 *               urlData:
 *                   - url_id: 1
 *                     original_url: 'https://example.com'
 *                     short_url_key: 'abc123'
 *                     user_id: 1
 *                     created_at: '2023-01-01T12:00:00Z'
 *                     clicks: 10
 *                   - url_id: 2
 *                     original_url: 'https://example2.com'
 *                     short_url_key: 'xyz789'
 *                     user_id: 2
 *                     created_at: '2023-01-02T12:00:00Z'
 *                     clicks: 5
 *       '204':
 *         description: Successful operation. But the database has no records.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: No URLs  found in the Database
 *               urlData: []
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/get-all-links", protect, admin, getAllLinks);

/**
 * @swagger
 * /api/get-link/{urlId}:
 *   get:
 *     summary: Get a specific shortened URL by ID.
 *     description: Retrieve details of a specific shortened URL by its ID. Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: urlId
 *         required: true
 *         description: ID of the shortened URL.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation. Returns details of the shortened URL.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: URL retrieved successfully
 *               urlData:
 *                 url_id: 1
 *                 original_url: 'https://example.com'
 *                 short_url_key: 'abc123'
 *                 user_id: 1
 *                 created_at: '2023-01-01T12:00:00Z'
 *                 clicks: 10
 *       '204':
 *         description: Successful operation. But the database has no records.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: No URLs  found in the Database
 *               urlData: []
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/get-link/:urlId", protect, admin, getLink);

/**
 * @swagger
 * /api/get-user-links/{userId}:
 *   get:
 *     summary: Get all URLs associated with a specific user.
 *     description: Retrieve a list of shortened URLs associated with a specific user. Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation. Returns a list of shortened URLs associated with the user.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: URLs retrieved successfully for the user
 *               urlData:
 *                   - url_id: 1
 *                     original_url: 'https://example.com'
 *                     short_url_key: 'abc123'
 *                     user_id: 1
 *                     created_at: '2023-01-01T12:00:00Z'
 *                     clicks: 10
 *                   - url_id: 2
 *                     original_url: 'https://example2.com'
 *                     short_url_key: 'xyz789'
 *                     user_id: 1
 *                     created_at: '2023-01-02T12:00:00Z'
 *                     clicks: 5
 *       '204':
 *         description: Successful operation. But the database has no records.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: No URLs  found in the Database
 *               urlData: []
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/get-user-links/:userId", protect, admin, getUserLinks);

/**
 * @swagger
 * /api/shrink-url:
 *   post:
 *     summary: Shrink a URL.
 *     description: Create a new shortened URL. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - URL Shortener
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             original_url: 'https://example3.com'
 *     responses:
 *       '201':
 *         description: URL shortened successfully. Returns details of the new shortened URL.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: URL shortened successfully
 *               url: 'https://example3.com/123abc'
 *       '204':
 *         description: Successful operation. But the database has no records.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: No URLs  found in the Database
 *               url: ""
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */

router.post("/shrink-url", protect, shrink);

/**
 * @swagger
 * /api/redirect/{shortUrl}:
 *   get:
 *     summary: Redirect to the original URL.
 *     description: Redirect to the original URL associated with the given short URL key.
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         description: Short URL key.
 *         schema:
 *           type: string
 *     responses:
 *       '302':
 *         description: Redirects to the original URL.
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */

router.get("/redirect/:shortUrl", redirect);

/**
 * @swagger
 * /api/delete/{urlId}:
 *   get:
 *     summary: Delete a shortened URL.
 *     description: Delete a shortened URL and associated analytics. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: urlId
 *         required: true
 *         description: ID of the shortened URL to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: URL deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: URL deleted successfully
 *       '204':
 *         description: Successful operation. But the database has no records.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: No URLs  found in the Database
 *               urlData: []
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */

router.get("/delete/:urlId", redirect);

export default router;
