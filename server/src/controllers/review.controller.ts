/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import review from "../models/review.model";

const factory = new ControllerFactory(review);

/**
 * @desc    Create a new review
 * @route   POST /api/v1/reviews
 * @access  Public
 */
export const { create } = factory;

/**
 * @desc    Get a single review by ID
 * @route   GET /api/v1/reviews/:id
 * @access  Public
 */
export const { findOne } = factory;

/**
 * @desc    Get all reviews
 * @route   GET /api/v1/reviews
 * @access  Private
 */
export const { findAll } = factory;

/**
 * @desc    Update a review by ID
 * @route   PUT /api/v1/reviews/:id
 * @access  Private
 */
export const { updateOne } = factory;

/**
 * @desc    Delete a review by ID
 * @route   DELETE /api/v1/reviews/:id
 * @access  Private
 */
export const { deleteOne } = factory;
