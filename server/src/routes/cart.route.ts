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
  createCartValidator,
  deleteCartValidator,
  updateCartValidator,
} from "../utils/validators/cart.validator";
import { allowedTo, protect } from "../middlewares/auth.js";
const router = express.Router();

router.use(protect, allowedTo("user"));

router
  .route("/")
  .get(getLoggedUserCart)
  .post(addProductToCart)
  .delete(clearLoggedUserCart);

router.route("/apply-coupon").post(applyCouponToCart);

router.route("/:itemId").put(updateItemQuantity).delete(deleteItemFromCart);

export default router;
