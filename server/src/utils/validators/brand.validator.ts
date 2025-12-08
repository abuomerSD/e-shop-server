import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import Brand from "../../models/brand.model.js";
import ApiError from "../apiError.js";

export const createBrandValidator = [
  body("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("name length is too short")
    .custom(async (value) => {
      const brand = await Brand.findOne({
        where: {
          name: value,
        },
      });

      if (brand) {
        throw new ApiError(400, "This Brand is Already Exists");
      }
    }),
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
    .withMessage("name length is too short")
    .custom(async (value) => {
      const brand = await Brand.findOne({
        where: {
          name: value,
        },
      });

      if (brand) {
        throw new ApiError(400, "This Brand is Already Exists");
      }
    }),
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
