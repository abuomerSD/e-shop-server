import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/cart.controller";
import {
  createCartValidator,
  deleteCartValidator,
  updateCartValidator,
} from "../utils/validators/cart.validator";
import { allowedTo, protect } from "../middlewares/auth.js";
const router = express.Router();

router
  .route("/")
  .get(findAll)
  .post(protect, allowedTo("admin"), createCartValidator, create);

router
  .route("/:id")
  .get(protect, allowedTo("admin"), findOne)
  .put(protect, allowedTo("admin"), updateCartValidator, updateOne)
  .delete(protect, allowedTo("admin"), deleteCartValidator, deleteOne);

export default router;
