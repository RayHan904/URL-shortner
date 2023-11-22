import { check } from "express-validator";
import { pool } from "../db/index.js";
import pkg from "bcryptjs";
const { compare } = pkg;
// Password validation
const password = check("password")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password has to be between 6 and 15 characters.");
// Email validation
const email = check("email")
    .isEmail()
    .withMessage("Please provide a valid email.");
// Check if email exists validation
const emailExistsCheck = check("email").custom(async (value) => {
    const { rows } = await pool.query("SELECT * from users WHERE email = $1", [value]);
    if (rows.length) {
        throw new Error("Email already exists!");
    }
});
// Login validation
const loginFieldCheck = check("email").custom(async (value, { req }) => {
    const user = await pool.query("SELECT * from users WHERE email = $1", [
        value,
    ]);
    if (!user.rows.length) {
        throw new Error("Email does not exist.");
    }
    const validPassword = await compare(req.body.password, user.rows[0].password_hash);
    if (!validPassword) {
        throw new Error("Wrong password.");
    }
    req.user = user.rows[0];
});
export const registerValidation = [email, password, emailExistsCheck];
export const loginValidation = [loginFieldCheck];
//# sourceMappingURL=auth.js.map