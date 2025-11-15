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
const router = express.Router();

router.route("/").get(findAll).post(createCategoryValidator, create);

router
  .route("/:id")
  .get(findOne)
  .put(updateCategoryValidator, updateOne)
  .delete(deleteCategoryValidator, deleteOne);

export default router;
