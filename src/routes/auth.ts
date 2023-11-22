import express from "express";
import {
  getUsers,
  deleteUser,
  register,
  login,
  logout,
} from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../validators/auth.js";
import {
  validationMiddleware,
  protect,
  admin,
} from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/users/get-users:
 *   get:
 *     summary: Get all users.
 *     description: Retrieve a list of all users. Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       '201':
 *         description: Successful operation. Returns a list of users.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Users retrieved successfully
 *               users:
 *                 - user_id: 1
 *                   email: user1@example.com
 *                   created_at: '2023-01-01T12:00:00Z'
 *                   is_admin: false
 *                 - user_id: 2
 *                   email: user2@example.com
 *                   created_at: '2023-01-02T12:00:00Z'
 *                   is_admin: true
 *                 - user_id: 3
 *                   email: user3@example.com
 *                   created_at: '2023-01-02T12:00:00Z'
 *                   is_admin: false
 *       '204':
 *         description: Successful operation. But database has no records.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: No Users found in the Database
 *               users: []
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */

router.get("/get-users", protect, admin, getUsers);

/**
 * @swagger
 * /api/users/delete/{userId}:
 *   delete:
 *     summary: Delete a user by ID.
 *     description: Delete a user by the provided user ID. Requires authentication and admin privileges.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to be deleted.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User deleted successfully
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete("/delete/:userId", protect, admin, deleteUser);
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user.
 *     description: Register a new user with the provided credentials.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User registered successfully
 *       '400':
 *         description: Bad request.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Email already exists!
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/register", registerValidation, validationMiddleware, register);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login and obtain an authentication token.
 *     description: Login with valid credentials to obtain an authentication token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Logged in successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Logged in successfully.
 *       '400':
 *         description: Bad request.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid Email or Password.
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/login", loginValidation, validationMiddleware, login);
/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: Logout the current user.
 *     description: Logout the currently authenticated user. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Authentication
 *     responses:
 *       '201':
 *         description: Logged out successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Logged out successfully.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/logout", protect, logout);

export default router;
