/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import subCategory from "../models/subCategory.model";

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
export const { findAll } = factory;

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
