/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import product from "../models/product.model";
import asyncHandler from "express-async-handler";
import { ApiFeatures } from "../utils/apiFeatures";
import Category from "../models/category.model";
import Brand from "../models/brand.model";

const factory = new ControllerFactory(product);

/**
 * @desc    Create a new product
 * @route   POST /api/v1/products
 * @access  Public
 */
export const { create } = factory;

/**
 * @desc    Get a single product by ID
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
export const { findOne } = factory;

/**
 * @desc    Get all products
 * @route   GET /api/v1/products
 * @access  Private
 */
export const findAll = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(req.query);
  const whereClause = apiFeatures.search().paginate().sort().whereClause;

  // Add filtering for categoryId and brandId
  if (req.query.categoryId) {
    whereClause.where = whereClause.where || {};
    whereClause.where.categoryId = req.query.categoryId;
  }

  if (req.query.brandId) {
    whereClause.where = whereClause.where || {};
    whereClause.where.brandId = req.query.brandId;
  }

  whereClause.include = [
    {
      model: Category,
      as: "category",
      attributes: ["id", "name"],
    },
    {
      model: Brand,
      as: "brand",
      attributes: ["id", "name"],
    },
  ];

  const products = await product.findAll(whereClause);
  const countResultsWhere = apiFeatures.search().whereClause;

  // Apply same filters to count query
  if (req.query.categoryId) {
    countResultsWhere.where = countResultsWhere.where || {};
    countResultsWhere.where.categoryId = req.query.categoryId;
  }

  if (req.query.brandId) {
    countResultsWhere.where = countResultsWhere.where || {};
    countResultsWhere.where.brandId = req.query.brandId;
  }

  const results = await product.count(countResultsWhere);

  res.status(200).json({
    status: "success",
    results,
    data: products,
  });
});

/**
 * @desc    Update a product by ID
 * @route   PUT /api/v1/products/:id
 * @access  Private
 */
export const { updateOne } = factory;

/**
 * @desc    Delete a product by ID
 * @route   DELETE /api/v1/products/:id
 * @access  Private
 */
export const { deleteOne } = factory;
