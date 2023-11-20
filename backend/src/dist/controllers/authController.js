import asyncHandler from "../middleware/asynHandler.js";
import { pool } from "../db/index.js";
import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken";
import config from "../constants/index.js";
const { sign } = pkg;
const { SECRET, USERS_TABLE } = config;
const { hash } = bcrypt;
const getUsers = asyncHandler(async (req, res) => {
    const { rows, rowCount } = await pool.query(`SELECT * FROM ${USERS_TABLE}`);
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
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    // Perform the delete operation
    const result = await pool.query(`DELETE FROM ${USERS_TABLE} WHERE user_id = $1`, [userId]);
    const { rowCount } = result;
    if (rowCount >= 1) {
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: "User not found or failed to delete.",
        });
    }
});
const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    // Check if there are any existing users
    const existingUsers = await pool.query(`SELECT COUNT(*) FROM ${USERS_TABLE}`);
    // Determine if the user being registered is the first user
    const isFirstUser = existingUsers.rows[0].count === 0;
    // Set is_admin field based on whether the user is the first user
    const isAdmin = isFirstUser ? true : false;
    const { rowCount } = await pool.query(`INSERT INTO ${USERS_TABLE}(email, password_hash, is_admin) VALUES ($1, $2, $3)`, [email, hashedPassword, isAdmin]);
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
export { getUsers, deleteUser, register, login, logout };
//# sourceMappingURL=authController.js.map