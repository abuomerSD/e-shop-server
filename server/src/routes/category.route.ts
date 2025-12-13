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

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get All Categories
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page Number
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Records Limit In the Page
 *         schema:
 *           type: number
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Sort the records By the column name, if You enter (-) before the column name the sort will be DESC
 *         schema:
 *           type: string
 *       - in: query
 *         name: searchCol
 *         required: false
 *         description: The column name that you will use for searching
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         required: false
 *         description: The Search Value
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returns all categories, you can apply paginations, sorting and filtering using the params
 */

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a New Category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: image
 *           example:
 *                name: "new category"
 *                image: "image"
 *     responses:
 *       201:
 *         description: returns the Created Category
 */
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

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get Specific Category By Id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returns specific Category by its Id
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Update a Specific Category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category Id
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: image
 *           example:
 *                name: "new Category updated"
 *                image: "image updated"
 *     responses:
 *       200:
 *         description: returns the Updated Category
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a Specific Category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category Id
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: returns the Updated Category
 */
router
  .route("/:id")
  .get(findOne)
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadSingleImage,
    updateCategoryValidator,
    resizeImage("category"),
    updateOne
  )
  .delete(
    protect,
    allowedTo("admin", "manager"),
    deleteCategoryValidator,
    deleteOne
  );

export default router;
