import { ControllerFactory } from "./controllerFactory.js";
import User from "../models/user.model.js";

const factory = new ControllerFactory(User);

/**
 * @desc    Create a new user
 * @route   POST /api/v1/users
 * @access  Public
 */
export const create = factory.create;

/**
 * @desc    Get a single user by ID
 * @route   GET /api/v1/users/:id
 * @access  Public
 */
export const findOne = factory.findOne;

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Private
 */
export const findAll = factory.findAll;

/**
 * @desc    Update a user by ID
 * @route   PUT /api/v1/users/:id
 * @access  Private
 */
export const updateOne = factory.updateOne;

/**
 * @desc    Delete a user by ID
 * @route   DELETE /api/v1/users/:id
 * @access  Private
 */
export const deleteOne = factory.deleteOne;
