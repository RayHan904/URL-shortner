import asyncHandler from "../middleware/asynHandler.js";
import { pool } from "../db/index.js";
import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken";
import config from "../constants/index.js";
const { sign } = pkg;
const { SECRET } = config;
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
    const token = await sign(payload, SECRET);
    if (token) {
        res.status(201).cookie("token", token, { httpOnly: true }).json({
            success: true,
            message: "Logged in successfully",
        });
    }
    else {
        res.status(500);
        throw new Error("Failed to login!");
    }
});
const logout = asyncHandler(async (req, res) => {
    res.status(201).clearCookie("token", { httpOnly: true }).json({
        success: true,
        message: "Logged out successfully",
    });
});
export { getUsers, register, login, logout };
//# sourceMappingURL=authController.js.map