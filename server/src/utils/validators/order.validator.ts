import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const createOrderValidator = [
  body("userId")
    .notEmpty()
    .withMessage("userId required")
    .isUUID()
    .withMessage("this user Id is not valid"),
  validatorMiddleware,
];

export const updateOrderValidator = [
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

export const deleteOrderValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  validatorMiddleware,
];
