import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import ApiError from "../apiError.js";

export const addProductToCartValidator = [
  body("productId")
    .notEmpty()
    .withMessage("productId required")
    .isUUID()
    .withMessage("this productId is not valid"),
  body("quantity")
    .notEmpty()
    .withMessage("Product Quantity is required")
    .isNumeric()
    .withMessage("Product Quantity Must be a Number")
    .custom((value) => {
      const quantity = Number(value);

      if (quantity <= 0) {
        throw new ApiError(400, "Product Quantity Must be Greater than 0");
      }

      return true;
    }),
  validatorMiddleware,
];

export const applyCouponToCartValidator = [
  body("name").notEmpty().withMessage("coupon name is required"),
  body("cartId")
    .notEmpty()
    .withMessage("cart id is required")
    .isUUID()
    .withMessage("cart id is not valid"),
  validatorMiddleware,
];

export const updateProductQuantityValidator = [
  param("cartId")
    .notEmpty()
    .withMessage("cartId is required")
    .isUUID()
    .withMessage("invalid cartId"),
  body("productId")
    .notEmpty()
    .withMessage("productId required")
    .isUUID()
    .withMessage("this productId is not valid"),
  body("quantity")
    .notEmpty()
    .withMessage("Product Quantity is required")
    .isNumeric()
    .withMessage("Product Quantity Must be a Number")
    .custom((value) => {
      const quantity = Number(value);

      if (quantity <= 0) {
        throw new ApiError(400, "Product Quantity Must be Greater than 0");
      }

      return true;
    }),
  validatorMiddleware,
];

export const clearLoggedUserCartValidator = [
  body("cartId")
    .notEmpty()
    .withMessage("cart id is required")
    .isUUID()
    .withMessage("cart id is not valid"),
  validatorMiddleware,
];

export const deleteProductFromCartValidator = [
  param("cartId")
    .notEmpty()
    .withMessage("Cart id is require")
    .isUUID()
    .withMessage("Cart id is not valid"),
  body("productId")
    .notEmpty()
    .withMessage("productId required")
    .isUUID()
    .withMessage("this productId is not valid"),
  validatorMiddleware,
];
