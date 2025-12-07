import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/product.controller";
import {
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} from "../utils/validators/product.validator";
import { allowedTo, protect } from "../middlewares/auth.js";
import { uploadProductImages } from "../middlewares/uploadImage.js";
import { resizeImage } from "../middlewares/resizeImage.js";
const router = express.Router();

router
  .route("/")
  .get(findAll)
  .post(
    protect,
    allowedTo("admin", "manager"),
    uploadProductImages,
    createProductValidator,
    resizeImage("product"),
    create
  );

router
  .route("/:id")
  .get(findOne)
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadProductImages,
    updateProductValidator,
    resizeImage("product"),
    updateOne
  )
  .delete(
    protect,
    allowedTo("admin", "manager"),
    deleteProductValidator,
    deleteOne
  );

export default router;
