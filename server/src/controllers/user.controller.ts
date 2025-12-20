/* eslint-disable import/extensions */
import asyncHandler from "express-async-handler";

import ControllerFactory from "./controllerFactory.js";
import User from "../models/user.model.js";
import { Request, Response } from "express";
import { generateRandomSixDigitNumber } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/emailSender.js";
import ApiError from "../utils/apiError.js";

const factory = new ControllerFactory(User);

/**
 * @desc    Create a new user
 * @route   POST /api/v1/users
 * @access  Public
 */
export const { create } = factory;

/**
 * @desc    Get a single user by ID
 * @route   GET /api/v1/users/:id
 * @access  Public
 */
export const { findOne } = factory;

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Private
 */
export const { findAll } = factory;

/**
 * @desc    Update a user by ID
 * @route   PUT /api/v1/users/:id
 * @access  Private
 */
export const { updateOne } = factory;

/**
 * @desc    Delete a user by ID
 * @route   DELETE /api/v1/users/:id
 * @access  Private
 */
export const { deleteOne } = factory;

// change password

export const requestPasswordChange = asyncHandler(
  async (req: Request, res: Response) => {
    // get the user by id
    const userId = req.user.id;
    const user = await User.findOne({ where: { id: userId } });

    // create password reset code 6-digits and store it in the user passwordResetCode record in database
    const otp = generateRandomSixDigitNumber();

    // save the otp to the database
    if (!user) {
      throw new ApiError(
        401,
        "the logged user can not change password, please sign in again"
      );
    }

    user.passwordResetCode = otp.toString();
    await user.save();
    // send the reset code to the users email
    if (user) {
      sendEmail(user.email, "6-Digits OTP Code", "", resetPasswordHTML(otp));
    }

    //
  }
);

export const verifyPasswordResetCode = asyncHandler(
  (req: Request, res: Response) => {
    // get user by id
    // compare the reset code
    // reset password
  }
);

const resetPasswordHTML = (otp: number) => {
  return `
  
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Your OTP Code</title>
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f7fa;
      font-family: Arial, sans-serif;
    }

    .otp-card {
      background: #ffffff;
      padding: 30px 40px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .title {
      font-size: 16px;
      color: #444;
      margin-bottom: 12px;
    }

    .otp {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #111;
      padding: 12px 20px;
      border: 1px dashed #ccc;
      border-radius: 6px;
      background: #f9fafb;
      user-select: all;
    }

    .note {
      font-size: 13px;
      color: #666;
      margin-top: 14px;
    }
  </style>
</head>
<body>

  <div class="otp-card">
    <div class="title">Your One-Time Password</div>

    <!-- Replace 123456 dynamically -->
    <div class="otp">${otp}</div>

    <div class="note">
      Copy this code and paste it on the website
    </div>
  </div>

</body>
</html>

  `;
};
