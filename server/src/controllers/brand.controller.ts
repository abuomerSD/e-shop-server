/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import Brand from "../models/brand.model";

const factory = new ControllerFactory(Brand);

/**
 * @desc    Create a new brand
 * @route   POST /api/v1/brands
 * @access  Public
 */
export const { create } = factory;

/**
 * @desc    Get a single brand by ID
 * @route   GET /api/v1/brands/:id
 * @access  Public
 */
export const { findOne } = factory;

/**
 * @desc    Get all brands
 * @route   GET /api/v1/brands
 * @access  Private
 */
export const { findAll } = factory;

/**
 * @desc    Update a brand by ID
 * @route   PUT /api/v1/brands/:id
 * @access  Private
 */
export const { updateOne } = factory;

/**
 * @desc    Delete a brand by ID
 * @route   DELETE /api/v1/brands/:id
 * @access  Private
 */
export const { deleteOne } = factory;
