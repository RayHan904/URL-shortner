import express from "express";
import { getUsers, deleteUser, register, login, logout, } from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../validators/auth.js";
import { validationMiddleware, protect, admin, } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/get-users", protect, admin, getUsers);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/logout", protect, logout);
router.delete("/delete/:userId", protect, admin, deleteUser);
export default router;
//# sourceMappingURL=auth.js.map