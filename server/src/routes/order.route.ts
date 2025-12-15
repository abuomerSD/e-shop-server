import express from "express";
import {
  findAll,
  findOne,
  createCashOrder,
  createOnlineOrder,
} from "../controllers/order.controller";
import {
  createOrderValidator,
  deleteOrderValidator,
  updateOrderValidator,
} from "../utils/validators/order.validator";
import { allowedTo, protect } from "../middlewares/auth.js";
const router = express.Router();

router.use(protect, allowedTo("user"));

router.route("/").get(findAll);
router.post("/createCashOrder", createCashOrder);
router.post("/createOnlineOrder", createOnlineOrder);
router.route("/:id").get(protect, allowedTo("admin"), findOne);

export default router;
