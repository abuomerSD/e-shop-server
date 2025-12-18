import express from "express";
import {
  findAll,
  findOne,
  createCashOrder,
  createOnlineOrder,
  createInvoice,
  makePayment,
} from "../controllers/order.controller";
import {
  createOrderValidator,
  deleteOrderValidator,
  updateOrderValidator,
} from "../utils/validators/order.validator";
import { allowedTo, protect } from "../middlewares/auth.js";
const router = express.Router();

router.put("/makePayment", makePayment);

router.use(protect, allowedTo("user"));

router.route("/").get(findAll);
router.post("/createCashOrder", createCashOrder);
router.post("/createOnlineOrder", createOnlineOrder);
router.post("/createInvoice", createInvoice);
router.route("/:id").get(protect, allowedTo("admin"), findOne);

export default router;
