import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/order.model";
import ControllerFactory from "./controllerFactory";
import Cart from "../models/cart.model";
import CartItem from "../models/cartItems.model";

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
  async (req: Request, res: Response) => {
    // create order
    const { userId, shippingAddress, cartId } = req.body;

    const paymentMethodType = "cash";

    // get the cart
    const cart = await Cart.findOne({
      where: { id: cartId },
      include: [{ model: CartItem, as: "cartItems", foreignKey: "cartId" }],
    });

    // calculate Tax Price
    // calculate shipping price

    if (cart) {
      console.log("cartItems", cart.cartItems);
    }

    res.status(201).json({ status: "success" });

    // create orderItems
  }
);

// create online order
export const createOnlineOrder = asyncHandler(
  async (req: Request, res: Response) => {}
);

// make payment
// make delivered
