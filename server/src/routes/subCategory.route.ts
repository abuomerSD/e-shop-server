import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/subCategory.controller";
import {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
} from "../utils/validators/subCategory.validator";
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
    createSubCategoryValidator,
    resizeImage("subCategory"),
    create
  );

router
  .route("/:id")
  .get(findOne)
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadSingleImage,
    updateSubCategoryValidator,
    resizeImage("subCategory"),
    updateOne
  )
  .delete(
    protect,
    allowedTo("admin", "manager"),
    deleteSubCategoryValidator,
    deleteOne
  );

export default router;
