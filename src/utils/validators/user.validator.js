import { body, param } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

export const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("name length is too short"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email not valid"),
  body("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 5 })
    .withMessage("password length must be greater than 5 characters"),
  validatorMiddleware,
];

export const updateUserValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  body("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("name length is too short"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email not valid"),
  body("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 5 })
    .withMessage("password length must be greater than 5 characters"),
  validatorMiddleware,
];

export const deleteUserValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  validatorMiddleware,
];
