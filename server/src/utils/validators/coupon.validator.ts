import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const createCouponValidator = [
  body("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("name length is too short"),
  body("expire")
    .notEmpty()
    .withMessage("expires is required")
    .isDate()
    .withMessage("this date format is not supported"),
  body("discount")
    .notEmpty()
    .withMessage("discount is required")
    .isNumeric()
    .withMessage("discount must be a number"),
  validatorMiddleware,
];

export const updateCouponValidator = [
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
  body("expire")
    .notEmpty()
    .withMessage("expires is required")
    .isDate()
    .withMessage("this date format is not supported"),
  body("discount")
    .notEmpty()
    .withMessage("discount is required")
    .isNumeric()
    .withMessage("discount must be a number"),
  validatorMiddleware,
];

export const deleteCouponValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  validatorMiddleware,
];
