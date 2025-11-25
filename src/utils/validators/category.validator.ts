import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("name length is too short"),
  validatorMiddleware,
];

export const updateCategoryValidator = [
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

export const deleteCategoryValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  validatorMiddleware,
];
