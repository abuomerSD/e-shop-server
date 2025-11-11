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
import { validatorMiddleware } from "../middlewares/validatorMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(findAll)
  .post(createUserValidator, validatorMiddleware, create);

router
  .route("/:id")
  .get(findOne)
  .put(updateUserValidator, validatorMiddleware, updateOne)
  .delete(deleteUserValidator, validatorMiddleware, deleteOne);

export default router;
