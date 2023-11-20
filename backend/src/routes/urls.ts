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

router.get("/get-all-links", protect, admin, getAllLinks);
router.get("/get-link/:urlId", protect, admin, getLink);
router.get("/get-user-links/:userId", protect, admin, getUserLinks);
router.post("/shrink-url", protect, shrink);
router.get("/redirect/:shortUrl", redirect);
router.get("/delete/:urlId", redirect);

export default router;
