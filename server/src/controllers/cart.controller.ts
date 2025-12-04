/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import Cart from "../models/cart.model";

const factory = new ControllerFactory(Cart);

/**
 * @desc    Create a new cart
 * @route   POST /api/v1/cart
 * @access  Public
 */
export const { create } = factory;

/**
 * @desc    Get a single cart by ID
 * @route   GET /api/v1/cart/:id
 * @access  Public
 */
export const { findOne } = factory;

/**
 * @desc    Get all cart
 * @route   GET /api/v1/cart
 * @access  Private
 */
export const { findAll } = factory;

/**
 * @desc    Update a cart by ID
 * @route   PUT /api/v1/cart/:id
 * @access  Private
 */
export const { updateOne } = factory;

/**
 * @desc    Delete a cart by ID
 * @route   DELETE /api/v1/cart/:id
 * @access  Private
 */
export const { deleteOne } = factory;
