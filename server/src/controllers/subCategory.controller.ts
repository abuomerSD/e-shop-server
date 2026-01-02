/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import subCategory from "../models/subCategory.model";
import category from "../models/category.model";
import asyncHandler from "express-async-handler";
import { ApiFeatures } from "../utils/apiFeatures";

const factory = new ControllerFactory(subCategory);

/**
 * @desc    Create a new subCategory
 * @route   POST /api/v1/subCategories
 * @access  Public
 */
export const { create } = factory;

/**
 * @desc    Get a single subCategory by ID
 * @route   GET /api/v1/subCategories/:id
 * @access  Public
 */
export const { findOne } = factory;

/**
 * @desc    Get all subCategories
 * @route   GET /api/v1/subCategories
 * @access  Private
 */
export const findAll = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(req.query);
  const whereClause = apiFeatures.search().paginate().sort().whereClause;
  whereClause.include = [
    {
      model: category,
      as: "category",
      attributes: ["id", "name"],
    },
  ];
  const subCategories = await subCategory.findAll(whereClause);
  res.status(200).json({
    status: "success",
    results: subCategories.length,
    data: subCategories,
  });
});

/**
 * @desc    Update a subCategory by ID
 * @route   PUT /api/v1/subCategories/:id
 * @access  Private
 */
export const { updateOne } = factory;

/**
 * @desc    Delete a subCategory by ID
 * @route   DELETE /api/v1/subCategories/:id
 * @access  Private
 */
export const { deleteOne } = factory;
