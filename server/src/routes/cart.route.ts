import express from "express";
import {
  addProductToCart,
  applyCouponToCart,
  clearLoggedUserCart,
  deleteItemFromCart,
  getLoggedUserCart,
  updateItemQuantity,
} from "../controllers/cart.controller";
import {
  addProductToCartValidator,
  applyCouponToCartValidator,
  clearLoggedUserCartValidator,
  deleteProductFromCartValidator,
  updateProductQuantityValidator,
} from "../utils/validators/cart.validator";
import { allowedTo, protect } from "../middlewares/auth.js";
const router = express.Router();

router.use(protect, allowedTo("user"));

router
  .route("/")
  .get(getLoggedUserCart)
  .post(addProductToCartValidator, addProductToCart)
  .delete(clearLoggedUserCartValidator, clearLoggedUserCart);

router
  .route("/apply-coupon")
  .post(applyCouponToCartValidator, applyCouponToCart);

router
  .route("/:cartId")
  .put(updateProductQuantityValidator, updateItemQuantity)
  .delete(deleteProductFromCartValidator, deleteItemFromCart);

export default router;
