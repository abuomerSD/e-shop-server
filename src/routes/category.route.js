import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/category.controller.js";
import {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} from "../utils/validators/category.validator.js";
import { allowedTo, protect } from "../middlewares/auth.js";
import { uploadSingleImage } from "../middlewares/uploadImage.js";
import { resizeImage } from "../middlewares/resizeImage.js";
const router = express.Router();

router
  .route("/")
  .get(findAll)
  .post(
    protect,
    allowedTo("admin", "manager"),
    uploadSingleImage,
    createCategoryValidator,
    resizeImage("category"),
    create
  );

router
  .route("/:id")
  .get(findOne)
  .put(
    protect,
    allowedTo("admin", "manager"),
    updateCategoryValidator,
    updateOne
  )
  .delete(
    protect,
    allowedTo("admin", "manager"),
    deleteCategoryValidator,
    deleteOne
  );

export default router;
