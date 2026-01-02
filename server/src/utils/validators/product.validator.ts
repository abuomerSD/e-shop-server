import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import Product from "../../models/product.model.js";
import ApiError from "../apiError.js";

export const createProductValidator = [
  body("title")
    .notEmpty()
    .withMessage("title required")
    .isLength({ min: 3 })
    .withMessage("title length is too short")
    // check if product title already exists
    .custom(async (value) => {
      const product = await Product.findOne({
        where: {
          title: value,
        },
      });

      if (product) {
        throw new ApiError(400, "This Product Already Exists");
      }
    }),
  body("description").notEmpty().withMessage("Description is required"),
  // price
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat()
    .withMessage("price must be a number"),
  // categoryId
  body("categoryId")
    .notEmpty()
    .withMessage("categoryId is required")
    .isUUID()
    .withMessage("invalid categoryId"),
  // brandId
  body("brandId")
    .notEmpty()
    .withMessage("brandId is required")
    .isUUID()
    .withMessage("invalid brandId"),
  // quantity
  body("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isInt()
    .withMessage("quantity must be an integer"),
  validatorMiddleware,
];

export const updateProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  body("title")
    .notEmpty()
    .withMessage("title required")
    .isLength({ min: 3 })
    .withMessage("title length is too short")
    .custom(async (value) => {
      const product = await Product.findOne({
        where: {
          title: value,
        },
      });

      if (product) {
        throw new ApiError(400, "This Product Already Exists");
      }
    }),
  body("description").notEmpty().withMessage("Description is required"),
  // price
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat()
    .withMessage("price must be a number"),
  // categoryId
  body("categoryId")
    .notEmpty()
    .withMessage("categoryId is required")
    .isUUID()
    .withMessage("invalid categoryId"),
  // brandId
  body("brandId")
    .notEmpty()
    .withMessage("brandId is required")
    .isUUID()
    .withMessage("invalid brandId"),
  // quantity
  body("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isInt()
    .withMessage("quantity must be an integer"),
  validatorMiddleware,
];

export const deleteProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .isUUID()
    .withMessage("invalid id"),
  validatorMiddleware,
];
