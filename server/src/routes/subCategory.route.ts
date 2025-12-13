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

/**
 * @swagger
 * /api/v1/subCategories:
 *   get:
 *     summary: Get All SubCategories
 *     tags: [SubCategories]
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
 *         description: returns all SubCategories, you can apply paginations, sorting and filtering using the params
 */

/**
 * @swagger
 * /api/v1/subCategories:
 *   post:
 *     summary: Create a New SubCategory
 *     tags: [SubCategories]
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
 *               categoryId:
 *                 type: string
 *               image:
 *                 type: image
 *           example:
 *                name: "new SubCategory"
 *                categoryId: "448ae829-bfc7-4b72-a1ec-179a6d381194"
 *     responses:
 *       201:
 *         description: returns the Created SubCategory, the discount is percentage number
 */
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

/**
 * @swagger
 * /api/v1/subCategories/{id}:
 *   get:
 *     summary: Get Specific SubCategory By Id
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: SubCategory Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returns specific SubCategory by its Id
 */

/**
 * @swagger
 * /api/v1/subCategories/{id}:
 *   put:
 *     summary: Update a Specific SubCategory
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: SubCategory Id
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
 *               categoryId:
 *                 type: string
 *               image:
 *                 type: image
 *           example:
 *                name: "new SubCategory"
 *                categoryId: "448ae829-bfc7-4b72-a1ec-179a6d381194"
 *     responses:
 *       200:
 *         description: returns the Updated SubCategory
 */

/**
 * @swagger
 * /api/v1/subCategories/{id}:
 *   delete:
 *     summary: Delete a Specific SubCategory
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: SubCategory Id
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: returns the Updated SubCategory
 */
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
