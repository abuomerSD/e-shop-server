import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/coupon.controller";
import {
  createCouponValidator,
  deleteCouponValidator,
  updateCouponValidator,
} from "../utils/validators/coupon.validator";
import { allowedTo, protect } from "../middlewares/auth.js";
const router = express.Router();

router
  .route("/")
  .get(findAll)
  .post(protect, allowedTo("admin"), createCouponValidator, create);

router
  .route("/:id")
  .get(protect, allowedTo("admin"), findOne)
  .put(protect, allowedTo("admin"), updateCouponValidator, updateOne)
  .delete(protect, allowedTo("admin"), deleteCouponValidator, deleteOne);

export default router;
