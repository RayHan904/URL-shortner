import express from "express";
import { getAllAnalytics, getUrlAnalytics, getUserAnalytics, } from "../controllers/analyticsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", protect, admin, getAllAnalytics);
router.get("/:urlId", protect, admin, getUrlAnalytics);
router.get("/:userId", protect, admin, getUserAnalytics);
export default router;
//# sourceMappingURL=analytics.js.map