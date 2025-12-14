import express from "express";
import {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
} from "../controllers/coupon.controller";
import {
  createCouponValidator,
  deleteCouponValidator,
  updateCouponValidator,
} from "../utils/validators/coupon.validator";
import { allowedTo, protect } from "../middlewares/auth.js";
const router = express.Router();

router.use(protect, allowedTo("admin", "manager"));

/**
 * @swagger
 * /api/v1/coupons:
 *   get:
 *     summary: Get All Coupons - Private admin | manager
 *     tags: [Coupons]
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
 *         description: returns all Coupons, you can apply paginations, sorting and filtering using the params
 */

/**
 * @swagger
 * /api/v1/coupons:
 *   post:
 *     summary: Create a New Coupon - Private admin | manager
 *     tags: [Coupons]
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
 *               expire:
 *                 type: date
 *               discount:
 *                 type: number
 *           example:
 *                name: "new Coupon"
 *                expire: "11-12-2026"
 *                discount: 10
 *     responses:
 *       201:
 *         description: returns the Created Coupon, the discount is percentage number
 */
router.route("/").get(findAll).post(createCouponValidator, create);

/**
 * @swagger
 * /api/v1/coupons/{id}:
 *   get:
 *     summary: Get Specific Coupon By Id - Private admin | manager
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Coupon Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returns specific Coupon by its Id
 */

/**
 * @swagger
 * /api/v1/coupons/{id}:
 *   put:
 *     summary: Update a Specific Coupon - Private admin | manager
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Coupon Id
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
 *               expire:
 *                 type: date
 *               discount:
 *                 type: number
 *           example:
 *                name: "new Coupon"
 *                expire: "11-12-2026"
 *                discount: 10
 *     responses:
 *       200:
 *         description: returns the Updated Coupon
 */

/**
 * @swagger
 * /api/v1/coupons/{id}:
 *   delete:
 *     summary: Delete a Specific Coupon - Private admin | manager
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Coupon Id
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: returns the Updated Coupon
 */
router
  .route("/:id")
  .get(findOne)
  .put(updateCouponValidator, updateOne)
  .delete(deleteCouponValidator, deleteOne);

export default router;
