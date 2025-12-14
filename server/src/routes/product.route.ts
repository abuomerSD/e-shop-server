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

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get All Products - Public
 *     tags: [Products]
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
 *         description: returns all Products, you can apply paginations, sorting and filtering using the params
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a New Product - Private admin | manager
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               images:
 *                 type: images []
 *               imageCover:
 *                 type: image
 *           example:
 *                title: "new Product"
 *                description: "description"
 *                categoryId: "448ae829-bfc7-4b72-a1ec-179a6d381194"
 *     responses:
 *       201:
 *         description: returns the Created Product, the discount is percentage number
 */
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

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get Specific Product By Id - Public
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returns specific Product by its Id
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a Specific Product - Private admin | manager
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product Id
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               images:
 *                 type: images []
 *               imageCover:
 *                 type: image
 *           example:
 *                title: "new Product"
 *                description: "description"
 *                categoryId: "448ae829-bfc7-4b72-a1ec-179a6d381194"
 *     responses:
 *       200:
 *         description: returns the Updated Product
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a Specific Product - Private admin | manager
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product Id
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: returns the Updated Product
 */
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
