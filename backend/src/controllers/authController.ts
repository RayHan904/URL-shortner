import { Request, Response } from "express";
import asyncHandler from "../middleware/asynHandler.js";
import { pool } from "../db/index.js";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

const { hash } = bcrypt;

interface User {
  user_id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const { rows, rowCount } = await pool.query<User>("SELECT * FROM users");

  if (rowCount >= 1) {
    res.status(201).json({
      success: true,
      users: rows,
      message: "Successfully fetched users!",
    });
  } else {
    res.status(500);
    throw new Error("Failed to get users!");
  }
});

const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await hash(password, 10);

  const { rowCount } = await pool.query(
    "INSERT INTO users(email, password_hash) VALUES ($1, $2)",
    [email, hashedPassword],
  );

  if (rowCount === 1) {
    res.status(201).json({
      success: true,
      message: "The registration was successful!",
    });
  } else {
    res.status(500);
    throw new Error("Failed to register!");
  }
});

const login = asyncHandler(async (req: Request, res: Response) => {
  let user = req.user as User | undefined;
  let payload = {
    id: user?.user_id,
    email: user?.email,
  };

  if (user) {
    res.status(201).json({
      payload,
    });
  } else {
    res.status(500);
    throw new Error("Failed to login!");
  }
});

export { getUsers, register, login };
