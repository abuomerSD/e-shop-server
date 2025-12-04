/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import order from "../models/order.model";

const factory = new ControllerFactory(order);

/**
 * @desc    Create a new order
 * @route   POST /api/v1/orders
 * @access  Public
 */
export const { create } = factory;

/**
 * @desc    Get a single order by ID
 * @route   GET /api/v1/orders/:id
 * @access  Public
 */
export const { findOne } = factory;

/**
 * @desc    Get all order
 * @route   GET /api/v1/orders
 * @access  Private
 */
export const { findAll } = factory;

/**
 * @desc    Update a order by ID
 * @route   PUT /api/v1/orders/:id
 * @access  Private
 */
export const { updateOne } = factory;

/**
 * @desc    Delete a order by ID
 * @route   DELETE /api/v1/orders/:id
 * @access  Private
 */
export const { deleteOne } = factory;
