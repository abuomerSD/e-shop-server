/* eslint-disable import/extensions */
import ControllerFactory from "./controllerFactory";
import coupon from "../models/coupon.model";

const factory = new ControllerFactory(coupon);

/**
 * @desc    Create a new coupon
 * @route   POST /api/v1/coupons
 * @access  Public
 */
export const { create } = factory;

/**
 * @desc    Get a single coupon by ID
 * @route   GET /api/v1/coupons/:id
 * @access  Public
 */
export const { findOne } = factory;

/**
 * @desc    Get all coupon
 * @route   GET /api/v1/coupons
 * @access  Private
 */
export const { findAll } = factory;

/**
 * @desc    Update a coupon by ID
 * @route   PUT /api/v1/coupons/:id
 * @access  Private
 */
export const { updateOne } = factory;

/**
 * @desc    Delete a coupon by ID
 * @route   DELETE /api/v1/coupons/:id
 * @access  Private
 */
export const { deleteOne } = factory;
