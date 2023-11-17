import express from "express";
import {
  getUsers,
  register,
  login,
  logout,
} from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../validators/auth.js";
import {
  validationMiddleware,
  protect,
  isAdmin,
} from "../middleware/authMiddleware.js";
const router = express.Router();

// router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router.get("/get-users", protect, isAdmin, getUsers);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/logout", protect, logout);
export default router;
