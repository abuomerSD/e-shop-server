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

router.use(protect, allowedTo("admin"));

router.route("/").get(findAll).post(createCouponValidator, create);

router
  .route("/:id")
  .get(findOne)
  .put(updateCouponValidator, updateOne)
  .delete(deleteCouponValidator, deleteOne);

export default router;
