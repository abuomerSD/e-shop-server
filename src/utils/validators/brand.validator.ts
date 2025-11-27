import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const createBrandValidator = [
  body("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("name length is too short"),
  validatorMiddleware,
];

export const updateBrandValidator = [
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
  validatorMiddleware,
];

export const deleteBrandValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  validatorMiddleware,
];
