import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const createCartValidator = [
  body("userId")
    .notEmpty()
    .withMessage("userId required")
    .isUUID()
    .withMessage("this user Id is not valid"),
  validatorMiddleware,
];

export const updateCartValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  body("userId")
    .notEmpty()
    .withMessage("userId required")
    .isUUID()
    .withMessage("this user Id is not valid"),
  validatorMiddleware,
];

export const deleteCartValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  validatorMiddleware,
];
