import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/order.model";
import ControllerFactory from "./controllerFactory";

const factory = new ControllerFactory(Order);

/**
 * @desc    Get All orders
 * @route   GET /api/v1/orders
 * @access  Private - admin | manager
 */
export const { findAll } = factory;

/**
 * @desc    Get a single order by ID
 * @route   GET /api/v1/orders/:id
 * @access  Public
 */
export const { findOne } = factory;

// create cash order
export const createCashOrder = asyncHandler(
  async (req: Request, res: Response) => {}
);

// create online order
export const createOnlineOrder = asyncHandler(
  async (req: Request, res: Response) => {}
);

// make payment
// make delivered
