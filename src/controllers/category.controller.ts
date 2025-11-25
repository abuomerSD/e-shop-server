/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import category from "../models/category.model.js";

const factory = new ControllerFactory(category);

/**
 * @desc    Create a new category
 * @route   POST /api/v1/categories
 * @access  Public
 */
export const { create } = factory;

/**
 * @desc    Get a single category by ID
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
export const { findOne } = factory;

/**
 * @desc    Get all categories
 * @route   GET /api/v1/categories
 * @access  Private
 */
export const { findAll } = factory;

/**
 * @desc    Update a category by ID
 * @route   PUT /api/v1/categories/:id
 * @access  Private
 */
export const { updateOne } = factory;

/**
 * @desc    Delete a category by ID
 * @route   DELETE /api/v1/categories/:id
 * @access  Private
 */
export const { deleteOne } = factory;
