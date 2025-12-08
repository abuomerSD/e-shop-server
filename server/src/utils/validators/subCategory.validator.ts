import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import SubCategory from "../../models/subCategory.model.js";
import ApiError from "../apiError.js";

export const createSubCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("name length is too short")
    .custom(async (value) => {
      const subCategory = await SubCategory.findOne({
        where: {
          name: value,
        },
      });

      if (subCategory) {
        throw new ApiError(400, "This SubCategory is Already Exists");
      }
    }),
  body("categoryId")
    .notEmpty()
    .withMessage("category id is required")
    .isUUID()
    .withMessage("category id not valid"),
  validatorMiddleware,
];

export const updateSubCategoryValidator = [
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
      const subCategory = await SubCategory.findOne({
        where: {
          name: value,
        },
      });

      if (subCategory) {
        throw new ApiError(400, "This SubCategory is Already Exists");
      }
    }),
  body("categoryId")
    .notEmpty()
    .withMessage("category id is required")
    .isUUID()
    .withMessage("category id not valid"),
  validatorMiddleware,
];

export const deleteSubCategoryValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  validatorMiddleware,
];
