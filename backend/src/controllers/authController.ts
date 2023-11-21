import { Request, Response } from "express";
import asyncHandler from "../middleware/asynHandler.js";
import { pool } from "../db/index.js";
import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken";
import config from "../constants/index.js";
import { User } from "../Interfaces/index.js";

const { sign } = pkg;
const { SECRET, USERS_TABLE } = config;
const { hash } = bcrypt;

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const { rows, rowCount } = await pool.query<User>(
    `SELECT * FROM ${USERS_TABLE}`,
  );

  if (rowCount >= 1) {
    res.status(201).json({
      success: true,
      users: rows,
      message: "Users retrieved successfully",
    });
  } else {
    res.status(204).json({
      success: true,
      users: [],
      message: "No Users found in the Database",
    });
  }
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const result = await pool.query(
    `DELETE FROM ${USERS_TABLE} WHERE user_id = $1`,
    [userId],
  );

  const { rowCount } = result;

  if (rowCount >= 1) {
    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } else {
    res.status(404);
    throw new Error();
  }
});

const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await hash(password, 10);

  // Check if there are any existing users
  const existingUsers = await pool.query(`SELECT COUNT(*) FROM ${USERS_TABLE}`);

  // Determine if the user being registered is the first user
  const isFirstUser = existingUsers.rows[0].count === 0;

  // Set is_admin field based on whether the user is the first user
  const isAdmin = isFirstUser ? true : false;

  const { rowCount } = await pool.query(
    `INSERT INTO ${USERS_TABLE}(email, password_hash, is_admin) VALUES ($1, $2, $3)`,
    [email, hashedPassword, isAdmin],
  );

  if (rowCount === 1) {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } else {
    res.status(500);
    throw new Error();
  }
});

const login = asyncHandler(async (req: any, res: any) => {
  let user = req.user as User | undefined;
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
  } else {
    res.status(500);
    throw new Error();
  }
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).clearCookie("token", { httpOnly: true }).json({
    success: true,
    message: "Logged out successfully",
  });
});
export { getUsers, deleteUser, register, login, logout };
