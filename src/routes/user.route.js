import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/user.controller.js";
import {
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
} from "../utils/validators/user.validator.js";
import { protect } from "../middlewares/auth.js";
const router = express.Router();

router.route("/").get(findAll).post(protect, createUserValidator, create);

router
  .route("/:id")
  .get(findOne)
  .put(updateUserValidator, updateOne)
  .delete(deleteUserValidator, deleteOne);

export default router;
