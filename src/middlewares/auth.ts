import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
import User from "../models/user.model";

import ApiError from "../utils/apiError";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      // get the token
      const token = authHeader.split(" ")[1];

      // verify the token
      const decoded = jwt.verify(token, JWT_SECRET);

      // get the user by the id
      const user = await User.findOne({
        where: {
          id: decoded.id,
        },
      });

      // check user
      if (!user) {
        throw new ApiError(
          401,
          "The User Who using this token is no longer Exists"
        );
      }

      // add user to the  request
      req.user = user;
      next();
    } else {
      throw new ApiError(
        401,
        "This is a Protected Route. You must Login or Signup first."
      );
    }
  } catch (err) {
    next(err);
  }
};

export const allowedTo =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      throw new ApiError(403, "This Route is Not Allowed To This Logged User");
    }
  };
