import asyncHandler from "../middleware/asynHandler.js";
import { pool } from "../db/index.js";
import config from "../constants/index.js";
const { ANALYTICS_TABLE, USERS_TABLE } = config;
const getAllAnalytics = asyncHandler(async (req, res) => {
    const { rows } = await pool.query(`SELECT * FROM ${ANALYTICS_TABLE}`);
    res.json(rows);
});
const getUrlAnalytics = asyncHandler(async (req, res) => {
    const { url_id } = req.params;
    // Total number of requests
    const totalRequestsResult = await pool.query(`SELECT COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1`, [url_id]);
    const totalRequests = totalRequestsResult.rows[0].count;
    // Request counts per week and month
    const weeklyCountsResult = await pool.query(`SELECT date_trunc('week', request_timestamp) AS week_start, COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY week_start ORDER BY week_start`, [url_id]);
    const monthlyCountsResult = await pool.query(`SELECT date_trunc('month', request_timestamp) AS month_start, COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY month_start ORDER BY month_start`, [url_id]);
    // Device type distribution
    const deviceTypeDistributionResult = await pool.query(`SELECT device_type, COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY device_type`, [url_id]);
    // OS type distribution
    const osTypeDistributionResult = await pool.query(`SELECT os_type, COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY os_type`, [url_id]);
    // Geographical distribution of requests
    const geographicalDistributionResult = await pool.query(`SELECT country, city, COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY country, city`, [url_id]);
    // Browser type distribution
    const browserTypeDistributionResult = await pool.query(`SELECT browser, COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY browser`, [url_id]);
    // Prepare and send the response
    const analyticsData = {
        totalRequests,
        weeklyCounts: weeklyCountsResult.rows,
        monthlyCounts: monthlyCountsResult.rows,
        deviceTypeDistribution: deviceTypeDistributionResult.rows,
        osTypeDistribution: osTypeDistributionResult.rows,
        geographicalDistribution: geographicalDistributionResult.rows,
        browserTypeDistribution: browserTypeDistributionResult.rows,
    };
    res.json(analyticsData);
});
const getUserAnalytics = asyncHandler(async (req, res) => {
    const { user_id } = req.params;
    const { rowCount: totalLinksGenerated } = await pool.query(`SELECT * FROM ${USERS_TABLE} WHERE user_id = $1`, [user_id]);
    const { rowCount: totalClicks } = await pool.query(`SELECT * FROM ${ANALYTICS_TABLE} WHERE user_id = $1`, [user_id]);
    res.json({ totalLinksGenerated, totalClicks });
});
export { getAllAnalytics, getUrlAnalytics, getUserAnalytics };
//# sourceMappingURL=analyticsController.js.map