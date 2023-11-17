import asyncHandler from "../middleware/asynHandler.js";
import { pool } from "../db/index.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
const getUsers = asyncHandler(async (req, res) => {
    const { rows, rowCount } = await pool.query("SELECT * FROM users");
    if (rowCount >= 1) {
        res.status(201).json({
            success: true,
            users: rows,
            message: "Successfully fetched users!",
        });
    }
    else {
        res.status(500);
        throw new Error("Failed to get users!");
    }
});
const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const { rowCount } = await pool.query("INSERT INTO users(email, password_hash) VALUES ($1, $2)", [email, hashedPassword]);
    if (rowCount === 1) {
        res.status(201).json({
            success: true,
            message: "The registration was successful!",
        });
    }
    else {
        res.status(500);
        throw new Error("Failed to register!");
    }
});
const login = asyncHandler(async (req, res) => {
    let user = req.user;
    let payload = {
        id: user?.user_id,
        email: user?.email,
    };
    if (user) {
        res.status(201).json({
            payload,
        });
    }
    else {
        res.status(500);
        throw new Error("Failed to login!");
    }
});
export { getUsers, register, login };
//# sourceMappingURL=authController.js.map