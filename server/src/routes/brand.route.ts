import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/brand.controller";
import {
  createBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} from "../utils/validators/brand.validator";
import { allowedTo, protect } from "../middlewares/auth";
import { uploadSingleImage } from "../middlewares/uploadImage";
import { resizeImage } from "../middlewares/resizeImage";
const router = express.Router();

/**
 * @swagger
 * /api/v1/brands:
 *   get:
 *     summary: Get All Brands
 *     tags: [Brands]
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
 *         description: returns all brands, you can apply paginations, sorting and filtering using the params
 */

/**
 * @swagger
 * /api/v1/brands:
 *   post:
 *     summary: Create a New Brand
 *     tags: [Brands]
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
 *                name: "new brand"
 *                image: "image"
 *     responses:
 *       201:
 *         description: returns the Created Brand
 */
router
  .route("/")
  .get(findAll)
  .post(
    protect,
    allowedTo("admin", "manager"),
    uploadSingleImage,
    createBrandValidator,
    resizeImage("brand"),
    create
  );

/**
 * @swagger
 * /api/v1/brands/{id}:
 *   get:
 *     summary: Get Specific Brand By Id
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returns specific brand by its Id
 */

/**
 * @swagger
 * /api/v1/brands/{id}:
 *   put:
 *     summary: Update a Specific Brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand Id
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
 *                name: "new brand updated"
 *                image: "image updated"
 *     responses:
 *       200:
 *         description: returns the Updated Brand
 */

/**
 * @swagger
 * /api/v1/brands/{id}:
 *   delete:
 *     summary: Delete a Specific Brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand Id
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: returns the Updated Brand
 */
router
  .route("/:id")
  .get(findOne)
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadSingleImage,
    updateBrandValidator,
    resizeImage("brand"),
    updateOne
  )
  .delete(
    protect,
    allowedTo("admin", "manager"),
    deleteBrandValidator,
    deleteOne
  );

export default router;
