import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import Category from "../../models/category.model.js";
import ApiError from "../apiError.js";

export const createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("name length is too short")
    .custom(async (value) => {
      const category = await Category.findOne({
        where: {
          name: value,
        },
      });

      if (category) {
        throw new ApiError(400, "This Category Already Exists");
      }
    }),
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
    .withMessage("name length is too short")
    .custom(async (value) => {
      const category = await Category.findOne({
        where: {
          name: value,
        },
      });

      if (category) {
        throw new ApiError(400, "This Category Already Exists");
      }
    }),
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
