import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/order.controller";
import {
  createOrderValidator,
  deleteOrderValidator,
  updateOrderValidator,
} from "../utils/validators/order.validator";
import { allowedTo, protect } from "../middlewares/auth.js";
const router = express.Router();

router
  .route("/")
  .get(findAll)
  .post(protect, allowedTo("admin"), createOrderValidator, create);

router
  .route("/:id")
  .get(protect, allowedTo("admin"), findOne)
  .put(protect, allowedTo("admin"), updateOrderValidator, updateOne)
  .delete(protect, allowedTo("admin"), deleteOrderValidator, deleteOne);

export default router;
