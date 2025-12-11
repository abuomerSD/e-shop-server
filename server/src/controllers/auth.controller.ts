import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User, { UserAttributes, UserInstance } from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config";
import ApiError from "../utils/apiError";

// ensure JWT_SECRET is string
const JWT_SECRET_KEY = JWT_SECRET as string;
const JWT_EXPIRES_IN = "7d";

/**
 * @desc    Sign up a New User
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // create user in the database
  const user = (await User.create({
    name,
    email,
    password,
  })) as unknown as UserInstance;

  // create jwt token
  const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // remove password from returned data
  const userData = user.get({ plain: true });
  delete userData.password;

  res.status(201).json({
    status: "success",
    data: userData,
    token,
  });
});

/**
 * @desc    login an existing User
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // find the user from DB
  const user = (await User.findOne({
    where: { email },
  })) as unknown as UserInstance;

  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  // check password
  const passwordIsCorrect = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!passwordIsCorrect) {
    throw new ApiError(400, "User Or Password is Incorrect");
  }

  // create token
  const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const userData = user.get({ plain: true });
  delete userData.password;

  res.status(200).json({
    status: "success",
    data: userData,
    token,
  });
});
