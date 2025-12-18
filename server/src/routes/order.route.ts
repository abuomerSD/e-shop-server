import express from "express";
import {
  findAll,
  findOne,
  createCashOrder,
  createOnlineOrder,
  makePayment,
} from "../controllers/order.controller";
import {
  createOrderValidator,
  deleteOrderValidator,
  updateOrderValidator,
} from "../utils/validators/order.validator";
import { allowedTo, protect } from "../middlewares/auth.js";
const router = express.Router();

router.route("/").get(protect, allowedTo("admin"), findAll);
router.post("/createCashOrder", protect, allowedTo("user"), createCashOrder);
router.post(
  "/createOnlineOrder",
  protect,
  allowedTo("user"),
  createOnlineOrder
);
router.post("/makePayment", makePayment);
router.route("/:id").get(protect, allowedTo("admin"), findOne);

export default router;
