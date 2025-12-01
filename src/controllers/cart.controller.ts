/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import Cart from "../models/cart.model";

const factory = new ControllerFactory(Cart);

/**
 * @desc    Create a new user
 * @route   POST /api/v1/users
 * @access  Public
 */
export const { create } = factory;

/**
 * @desc    Get a single user by ID
 * @route   GET /api/v1/users/:id
 * @access  Public
 */
export const { findOne } = factory;

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Private
 */
export const { findAll } = factory;

/**
 * @desc    Update a user by ID
 * @route   PUT /api/v1/users/:id
 * @access  Private
 */
export const { updateOne } = factory;

/**
 * @desc    Delete a user by ID
 * @route   DELETE /api/v1/users/:id
 * @access  Private
 */
export const { deleteOne } = factory;
