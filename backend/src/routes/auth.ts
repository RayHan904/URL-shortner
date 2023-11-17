import express from "express";
import { getUsers, register, login } from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../validators/auth.js";
import { validationMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router.get("/get-users", getUsers);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
export default router;
