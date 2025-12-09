/* eslint-disable import/extensions */
import asyncHandler from "express-async-handler";

import Cart from "../models/cart.model";
import { Request, Response } from "express";

/**
 * @desc    Add product to cart
 * @route   POST /api/v1/cart
 * @access  Private/ User
 */
export const addProductToCart = asyncHandler(
  async (req: Request, res: Response) => {}
);

/**
 * @desc    Get Cart For the logged User
 * @route   GET /api/v1/cart
 * @access  Private/ User
 */
export const getLoggedUserCart = asyncHandler(
  async (req: Request, res: Response) => {}
);

/**
 * @desc    Delete Logged user cart and cart items
 * @route   DELETE /api/v1/cart
 * @access  Private/ User
 */
export const clearLoggedUserCart = asyncHandler(
  async (req: Request, res: Response) => {}
);

/**
 * @desc    Update Item Quantity
 * @route   PUT /api/v1/cart/:itemId
 * @access  Private/ User
 */
export const updateItemQuantity = asyncHandler(
  async (req: Request, res: Response) => {}
);

/**
 * @desc    Delete Item From Cart
 * @route   DELETE /api/v1/cart/:itemId
 * @access  Private/ User
 */
export const deleteItemFromCart = asyncHandler(
  async (req: Request, res: Response) => {}
);
