import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import {
  loginValidator,
  signupValidator,
} from "../utils/validators/auth.validator.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Sign up a New User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: email
 *               password:
 *                 type: string
 *           example:
 *                name: "new user"
 *                email: "newuser@app.com"
 *                password: "password123"
 *     responses:
 *       201:
 *         description: returns the created user with his token
 */
router.route("/signup").post(signupValidator, signup);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a Registered User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *                email: "admin@admin.com"
 *                password: "password1"
 *     responses:
 *       201:
 *         description: returns the logged in user with his token
 */
router.route("/login").post(loginValidator, login);

export default router;
