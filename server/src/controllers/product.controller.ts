/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import product from "../models/product.model";

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
export const { findAll } = factory;

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
