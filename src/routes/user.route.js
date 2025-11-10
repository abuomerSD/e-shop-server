import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/user.controller.js";
const router = express.Router();

router.route("/").get(findAll).post(create);
router.route("/:id").get(findOne).put(updateOne).delete(deleteOne);

export default router;
