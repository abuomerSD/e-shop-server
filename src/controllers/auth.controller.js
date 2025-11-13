import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
import ApiError from "../utils/apiError.js";

/**
 * @desc    Sign up a New User
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
export const signup = asyncHandler(async (req, res) => {
  // create user in the database
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // create jwt token
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "1d",
  });

  // return token in the response
  res.status(201).json({
    status: "success",
    token,
  });
});

/**
 * @desc    login an existing User
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find the user from the database
  const user = await User.findOne({
    where: {
      email,
    },
  });

  //   throw error if user not found
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  //   check password
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    throw new ApiError(400, "User Or Password is Incorrect");
  }

  // if password is correct create token
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

  //   delete password from the response
  const userData = user.get({ plain: true });

  delete userData.password;
  res.status(200).json({
    status: "success",
    userData,
    token,
  });
});
