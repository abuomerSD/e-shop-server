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

router.use(protect, allowedTo("admin", "manager"));

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get All Users - Private admin | manager
 *     tags: [Users]
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
 *         description: returns all Users, you can apply paginations, sorting and filtering using the params
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a New User - Private admin | manager
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               profileImg:
 *                 type: image
 *               password:
 *                 type: string
 *           example:
 *                name: "new User"
 *                email: "user@user.com"
 *                phone: "012344389844"
 *                password: "passpasswwew21312"
 *     responses:
 *       201:
 *         description: returns the Created User, the discount is percentage number
 */
router.route("/").get(findAll).post(createUserValidator, create);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get Specific User By Id - Private admin | manager
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returns specific User by its Id
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a Specific User - Private admin | manager
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User Id
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
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               profileImg:
 *                 type: image
 *               password:
 *                 type: string
 *           example:
 *                name: "new User"
 *                email: "user@user.com"
 *                phone: "012344389844"
 *                password: "passpasswwew21312"
 *     responses:
 *       200:
 *         description: returns the Updated User
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a Specific User - Private admin | manager
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User Id
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: returns the Updated User
 */
router
  .route("/:id")
  .get(findOne)
  .put(updateUserValidator, updateOne)
  .delete(deleteUserValidator, deleteOne);

export default router;
