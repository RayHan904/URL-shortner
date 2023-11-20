import asyncHandler from "../middleware/asynHandler.js";
import { pool } from "../db/index.js";
import config from "../constants/index.js";
import shrinkUrl from "../utils/shrinkUrl.js";
const { URLS_TABLE, URL, NODE_ENV } = config;
// All Urls in the database
const getAllLinks = asyncHandler(async (req, res) => {
    const { rows, rowCount } = await pool.query(`SELECT * FROM ${URLS_TABLE} ORDER BY created_at DESC;`);
    if (!(rowCount > 0))
        return res.json({ status: "failed" });
    res.json(rows);
});
// Get links associated to a userId
const getLink = asyncHandler(async (req, res) => {
    const urlId = req.params.urlId;
    const { rows, rowCount } = await pool.query(`SELECT * FROM ${URLS_TABLE} WHERE url_id = $1 ORDER BY created_at DESC;`, [urlId]);
    if (!(rowCount > 0)) {
        return res.status(404).json({
            status: "failed",
            message: "No links found for the specified user ID.",
        });
    }
    res.json(rows);
});
// Get links associated to a userId
const getUserLinks = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { rows, rowCount } = await pool.query(`SELECT * FROM ${URLS_TABLE} WHERE user_id = $1 ORDER BY created_at DESC;`, [userId]);
    if (!(rowCount > 0)) {
        return res.status(404).json({
            status: "failed",
            message: "No links found for the specified user ID.",
        });
    }
    res.json(rows);
});
// shrink url
const shrink = asyncHandler(async (req, res) => {
    const { original_url } = req.body;
    const user_id = req.user.user_id;
    const short_url_key = shrinkUrl();
    await pool.query(`INSERT INTO ${URLS_TABLE}(short_url_key, original_url, user_id) VALUES ($1, $2, $3);`, [short_url_key, original_url, user_id]);
    res.json({
        url: `${URL}/${short_url_key}`,
    });
});
// redirect and update clicks
const redirect = asyncHandler(async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const request = await fetch("https://ipinfo.io/json?token=4435d576414fc3");
    const ipInfoResponse = await request.json();
    const deviceType = req.useragent.isMobile
        ? "Mobile"
        : req.useragent.isDesktop
            ? "Desktop"
            : null;
    const osType = req.useragent.os || "unknown";
    const country = ipInfoResponse.country || "unknown";
    const city = ipInfoResponse.city || "unknown";
    const browserType = req.useragent.browser || "unknown";
    const ip = NODE_ENV != "production" ? "162.223.101.235" : req.ip;
    console.log("Device Type:", deviceType);
    console.log("OS Type:", osType);
    console.log("Country:", country);
    console.log("City:", city);
    console.log("Browser Type:", browserType);
    console.log("ip:", ip);
    // console.log("JSON RES", ipInfoResponse);
    const { rows, rowCount } = await pool.query(`  UPDATE ${URLS_TABLE}
    SET clicks = clicks + 1
    WHERE short_url_key = $1
    RETURNING url_id, original_url, clicks;`, [shortUrl]);
    if (!(rowCount > 0)) {
        res.redirect("/");
    }
    const { url_id, original_url } = rows[0];
    await pool.query(`
  INSERT INTO analytics (
    url_id,
    device_type,
    os_type,
    country,
    city,
    browser_type
  ) VALUES ($1, $2, $3, $4, $5, $6);
  `, [url_id, deviceType, osType, country, city, browserType]);
    // Redirect to the original URL
    res.redirect(original_url);
});
const deleteLink = asyncHandler(async (req, res) => {
    const urlId = req.params.urlId;
    const { rowCount } = await pool.query(`DELETE FROM ${URLS_TABLE} WHERE url_id = $1;`, [urlId]);
    if (rowCount === 0) {
        return res.status(404).json({
            status: "failed",
            message: "No URL found for the specified URL ID.",
        });
    }
    res.json({
        status: "success",
        message: "URL deleted successfully.",
    });
});
export { getAllLinks, getLink, getUserLinks, shrink, redirect, deleteLink };
//# sourceMappingURL=urlController.js.map