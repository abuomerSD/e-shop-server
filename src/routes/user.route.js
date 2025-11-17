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
import { allowedTo, protect } from "../middlewares/auth.js";
const router = express.Router();

router
  .route("/")
  .get(findAll)
  .post(protect, allowedTo(["admin"]), createUserValidator, create);

router
  .route("/:id")
  .get(protect, allowedTo(["admin"]), findOne)
  .put(protect, allowedTo(["admin"]), updateUserValidator, updateOne)
  .delete(protect, allowedTo(["admin"]), deleteUserValidator, deleteOne);

export default router;
