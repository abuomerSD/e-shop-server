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
 * @desc    Add product to cart
 * @route   GET /api/v1/cart
 * @access  Private/ User
 */
export const getLoggedUserCart = asyncHandler(
  async (req: Request, res: Response) => {}
);

/**
 * @desc    Add product to cart
 * @route   DELETE /api/v1/cart
 * @access  Private/ User
 */
export const clearLoggedUserCart = asyncHandler(
  async (req: Request, res: Response) => {}
);

/**
 * @desc    Add product to cart
 * @route   PUT /api/v1/cart/:itemId
 * @access  Private/ User
 */
export const updateItemQuantity = asyncHandler(
  async (req: Request, res: Response) => {}
);

/**
 * @desc    Add product to cart
 * @route   DELETE /api/v1/cart/:itemId
 * @access  Private/ User
 */
export const deleteItemFromCart = asyncHandler(
  async (req: Request, res: Response) => {}
);
