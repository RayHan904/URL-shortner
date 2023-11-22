import express from "express";
import { getAllAnalytics, getUrlAnalytics, getUserAnalytics, } from "../controllers/analyticsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Analytics
 *     description: Endpoints for retrieving analytics data
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     in: cookie
 *     name: your_auth_cookie_name
 *
 * /api/analytics:
 *   get:
 *     summary: Get all analytics data.
 *     description: Retrieve a list of all analytics data. Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Analytics
 *     responses:
 *       '200':
 *         description: Successful operation. Returns a list of analytics data.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Analytics data retrieved successfully
 *               analytics:
 *                 - analytics_id: 1
 *                   url_id: 1
 *                   request_timestamp: '2023-01-01T12:00:00Z'
 *                   device_type: 'Desktop'
 *                   os_type: 'Windows'
 *                   country: 'United States'
 *                   city: 'New York'
 *                   browser_type: 'Chrome'
 *                 - analytics_id: 2
 *                   url_id: 2
 *                   request_timestamp: '2023-01-02T12:00:00Z'
 *                   device_type: 'Mobile'
 *                   os_type: 'iOS'
 *                   country: 'Canada'
 *                   city: 'Toronto'
 *                   browser_type: 'Safari'
 *                 - analytics_id: 3
 *                   url_id: 3
 *                   request_timestamp: '2023-01-02T12:00:00Z'
 *                   device_type: 'Desktop'
 *                   os_type: 'Linux'
 *                   country: 'Germany'
 *                   city: 'Berlin'
 *                   browser_type: 'Firefox'
 *       '204':
 *         description: Successful operation. But the database has no records.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: No analytics data found in the Database
 *               analytics: []
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", protect, admin, getAllAnalytics);
/**
 * @swagger
 * tags:
 *   - name: Analytics
 * /api/analytics/url-analytics/{urlId}:
 *   get:
 *     summary: Get analytics data for a specific URL.
 *     description: Retrieve analytics data for a specific URL. Requires authentication and admin privileges.
 *     parameters:
 *       - in: path
 *         name: urlId
 *         type: integer
 *         description: ID of the URL to fetch analytics data for.
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Analytics
 *     responses:
 *       '200':
 *         description: Successful operation. Returns analytics data for the specified URL.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Analytics data retrieved successfully
 *               analytics:
 *                 totalRequests: '15'
 *                 weeklyCounts:
 *                   - week_year: '2023 Week 44'
 *                     request_count: '1'
 *                   - week_year: '2023 Week 45'
 *                     request_count: '1'
 *                   - week_year: '2023 Week 46'
 *                     request_count: '5'
 *                   - week_year: '2023 Week 47'
 *                     request_count: '8'
 *                 monthlyCounts:
 *                   - month_year: 'November 2023'
 *                     request_count: '15'
 *                 deviceTypeDistribution:
 *                   - device_type: 'Desktop'
 *                     count: '4'
 *                   - device_type: 'Tablet'
 *                     count: '1'
 *                   - device_type: null
 *                     count: '10'
 *                 osTypeDistribution:
 *                   - os_type: 'Android'
 *                     count: '1'
 *                   - os_type: 'MacOS'
 *                     count: '1'
 *                   - os_type: 'OS X'
 *                     count: '3'
 *                   - os_type: 'unknown'
 *                     count: '10'
 *                 geographicalDistribution:
 *                   - country: 'CA'
 *                     city: 'Toronto'
 *                     count: '13'
 *                   - country: 'Germany'
 *                     city: 'Berlin'
 *                     count: '1'
 *                   - country: 'UK'
 *                     city: 'London'
 *                     count: '1'
 *                 browserTypeDistribution:
 *                   - browser_type: 'Chrome'
 *                     count: '3'
 *                   - browser_type: 'Edge'
 *                     count: '1'
 *                   - browser_type: 'Firefox'
 *                     count: '1'
 *                   - browser_type: 'PostmanRuntime'
 *                     count: '10'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/url-analytics/:urlId", protect, admin, getUrlAnalytics);
/**
 * @swagger
 * tags:
 *   - name: Analytics
 * /api/analytics/user-analytics/{userId}:
 *   get:
 *     summary: Get analytics data for a specific user.
 *     description: Retrieve analytics data for a specific user. Requires authentication and admin privileges.
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: integer
 *         description: ID of the user to fetch analytics data for.
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Analytics
 *     responses:
 *       '200':
 *         description: Successful operation. Returns analytics data for the specified user.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Analytics data retrieved successfully
 *               analytics:
 *                 totalLinksGenerated: 2
 *                 totalClicks: 17
 *       '204':
 *         description: Successful operation. But the database has no records.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: No analytics data found in the Database
 *               analytics: []
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/user-analytics/:userId", protect, admin, getUserAnalytics);
export default router;
//# sourceMappingURL=analytics.js.map