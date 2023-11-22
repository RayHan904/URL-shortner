import { Request, Response } from "express";
import asyncHandler from "../middleware/asynHandler.js";
import { QueryResult } from "pg";
import { pool } from "../db/index.js";
import config from "../constants/index.js";

const { ANALYTICS_TABLE, URLS_TABLE } = config;

const getAllAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const { rows, rowCount } = await pool.query(
    `SELECT * FROM ${ANALYTICS_TABLE}`,
  );

  if (rowCount > 0) {
    res.status(200).json({
      success: true,
      message: "Analytics data retrieved successfully",
      analytics: rows,
    });
  } else {
    res.status(204).json({
      success: true,
      message: "No analytics data found in the Database",
      analytics: [],
    });
  }
});

const getUrlAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const { urlId } = req.params;

  // Total number of requests
  const totalRequestsResult: QueryResult = await pool.query(
    `SELECT COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1`,
    [urlId],
  );

  const { rows: totalClicks } = totalRequestsResult;
  const totalRequests = totalClicks[0].count;

  // Request counts per week and month
  const weeklyCountsResult: QueryResult = await pool.query(
    `SELECT TO_CHAR(request_timestamp, 'IYYY "Week" IW') AS week_year, COUNT(*) AS request_count FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY week_year ORDER BY week_year`,
    [urlId],
  );

  const monthlyCountsResult: QueryResult = await pool.query(
    `SELECT TO_CHAR(request_timestamp, 'Month YYYY') AS month_year, COUNT(*) AS request_count FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY month_year ORDER BY month_year`,
    [urlId],
  );

  // Device type distribution
  const deviceTypeDistributionResult: QueryResult = await pool.query(
    `SELECT device_type, COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY device_type`,
    [urlId],
  );

  // OS type distribution
  const osTypeDistributionResult: QueryResult = await pool.query(
    `SELECT os_type, COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY os_type`,
    [urlId],
  );

  // Geographical distribution of requests
  const geographicalDistributionResult: QueryResult = await pool.query(
    `SELECT country, city, COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY country, city`,
    [urlId],
  );
  // Browser type distribution
  const browserTypeDistributionResult: QueryResult = await pool.query(
    `SELECT browser_type, COUNT(*) FROM ${ANALYTICS_TABLE} WHERE url_id = $1 GROUP BY browser_type`,
    [urlId],
  );

  // Prepare and send the response
  const analyticsData: {
    totalRequests: number;
    weeklyCounts: Array<{ week_start: Date; count: number }>;
    monthlyCounts: Array<{ month_start: Date; count: number }>;
    deviceTypeDistribution: Array<{ device_type: string; count: number }>;
    osTypeDistribution: Array<{ os_type: string; count: number }>;
    geographicalDistribution: Array<{
      country: string;
      city: string;
      count: number;
    }>;
    browserTypeDistribution: Array<{ browser_type: string; count: number }>;
  } = {
    totalRequests,
    weeklyCounts: weeklyCountsResult.rows,
    monthlyCounts: monthlyCountsResult.rows,
    deviceTypeDistribution: deviceTypeDistributionResult.rows,
    osTypeDistribution: osTypeDistributionResult.rows,
    geographicalDistribution: geographicalDistributionResult.rows,
    browserTypeDistribution: browserTypeDistributionResult.rows,
  };

  res.status(200).json({
    success: true,
    message: "Analytics data retrieved successfully",
    analytics: analyticsData,
  });
});

const getUserAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { rowCount: totalLinksGenerated } = await pool.query(
    `SELECT * FROM ${URLS_TABLE} WHERE user_id = $1`,
    [userId],
  );
  const { rowCount: totalClicks } = await pool.query(
    `SELECT * FROM ${ANALYTICS_TABLE} WHERE user_id = $1`,
    [userId],
  );

  res.status(200).json({
    success: true,
    message: "Analytics data retrieved successfully",
    analytics: {
      totalLinksGenerated: totalLinksGenerated,
      totalClicks: totalClicks,
    },
  });
});

export { getAllAnalytics, getUrlAnalytics, getUserAnalytics };
