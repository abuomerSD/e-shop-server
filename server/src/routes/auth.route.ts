import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import {
  loginValidator,
  signupValidator,
} from "../utils/validators/auth.validator.js";

const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);

export default router;
