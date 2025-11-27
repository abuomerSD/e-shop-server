import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/brand.controller";
import {
  createBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} from "../utils/validators/brand.validator";
import { allowedTo, protect } from "../middlewares/auth";
import { uploadSingleImage } from "../middlewares/uploadImage";
import { resizeImage } from "../middlewares/resizeImage";
const router = express.Router();

router
  .route("/")
  .get(findAll)
  .post(
    protect,
    allowedTo("admin", "manager"),
    uploadSingleImage,
    createBrandValidator,
    resizeImage("brand"),
    create
  );

router
  .route("/:id")
  .get(findOne)
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadSingleImage,
    updateBrandValidator,
    resizeImage("brand"),
    updateOne
  )
  .delete(
    protect,
    allowedTo("admin", "manager"),
    deleteBrandValidator,
    deleteOne
  );

export default router;
