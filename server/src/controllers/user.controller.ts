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
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new ApiError(401, "user email is not correct");
    }

    // create password reset code 6-digits and store it in the user passwordResetCode record in database
    const otp = generateRandomSixDigitNumber();

    // save the otp to the database
    user.passwordResetCode = otp.toString();
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    // send the reset code to the users email
    if (user) {
      sendEmail(user.email, "6-Digits OTP Code", "", getResetPasswordHTML(otp));
    }

    res.status(200).json({
      status: "success",
      data: { message: "OTP Code Sent To user email" },
    });

    //
  }
);

export const verifyPasswordResetCode = asyncHandler(
  async (req: Request, res: Response) => {
    const { resetCode, email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new ApiError(401, "user email is not correct");
    }

    // check the expires time
    if (!(new Date(Date.now()) < user.passwordResetExpires)) {
      throw new ApiError(400, "This Password Reset Code has Expired");
    }

    // compare the reset code
    if (user.passwordResetCode === resetCode) {
      user.passwordResetVerified = true;
      await user.save();
    } else {
      throw new ApiError(400, "this Password Reset Code is not correct");
    }

    res.status(200).json({
      status: "success",
      data: { message: "user password reset code verified" },
    });
  }
);

export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { newPassword, newPasswordConfirm, email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new ApiError(401, "user email is not correct");
    }

    if (!user) {
      throw new ApiError(
        401,
        "the logged user can not change password, please sign in again"
      );
    }

    if (newPassword === newPasswordConfirm && user.passwordResetVerified) {
      user.password = newPassword;
      user.passwordResetCode = "";
      user.passwordResetVerified = false;
      await user.save();
    }

    res.status(200).json({
      status: "success",
      data: { message: "user password changed" },
    });
  }
);

const getResetPasswordHTML = (otp: string) => {
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
      Copy this code and paste it on the website, The Reset Code Will Expire after 10 minutes
    </div>
  </div>

</body>
</html>

  `;
};
