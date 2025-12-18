import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import axios from "axios";

import Order from "../models/order.model";
import ControllerFactory from "./controllerFactory";
import Cart from "../models/cart.model";
import CartItem from "../models/cartItems.model";
import OrderItem, { OrderItemAttributes } from "../models/orderItems.model";
import { TPaymentMethodTypes } from "../types/paymentMothodTypes";
import {
  MOYASAR_CALLBACK_URL,
  MOYASAR_SECRET_KEY,
  MOYASAR_SUCCESS_URL,
  MOYASAR_URL,
} from "../config/env.config";
import ApiError from "../utils/apiError";

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

/**
 * @desc    Create Cash Order
 * @route   POST /api/v1/orders/createCashOrder
 * @access  Public
 */
export const createCashOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, shippingAddress, cartId } = req.body;

    const paymentMethodType = "cash";

    const { order, orderItems } = await createOrder(
      cartId,
      userId,
      shippingAddress,
      paymentMethodType
    );

    res.status(201).json({ status: "success", data: { order, orderItems } });
  }
);

// create online order
export const createOnlineOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, shippingAddress, cartId } = req.body;

    const paymentMethodType = "card";

    const { order, orderItems } = await createOrder(
      cartId,
      userId,
      shippingAddress,
      paymentMethodType
    );

    res.status(201).json({ status: "success", data: { order, orderItems } });
  }
);

const createOrder = async (
  cartId: string,
  userId: string,
  shippingAddress: object,
  paymentMethodType: TPaymentMethodTypes
) => {
  // get the cart
  const cart = await Cart.findOne({
    where: { id: cartId },
    include: [{ model: CartItem, as: "cartItems", foreignKey: "cartId" }],
  });

  // calculate shipping price

  // console.log("cart", cart);

  // create order

  const order = await Order.create({
    userId,
    shippingAddress,
    paymentMethodType,
    totalOrderPrice: cart?.totalCartPrice,
  });

  // create orderItems
  const orderId = order.id;
  let orderItemsObj: OrderItemAttributes[] = [];

  if (cart?.cartItems) {
    orderItemsObj = cart.cartItems.map((item) => {
      return {
        orderId,
        quantity: item.quantity,
        productId: item.productId,
      };
    });
  }

  const orderItems = await OrderItem.bulkCreate(orderItemsObj);

  // clear cart & cart items
  await cart?.destroy();
  await CartItem.destroy({ where: { cartId } });

  return { order, orderItems };
};

// create invoice

export const createInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId, description } = req.body;

    // get the order amount
    const order = await Order.findOne({ where: { id: orderId } });
    let amount = 0;
    if (order) {
      amount = order.totalOrderPrice ? order.totalOrderPrice : 0;
    }

    // console.log("order", order);
    // console.log("amount", amount);

    // sending create invoice request to moyasar api
    let data = {
      amount: amount * 100,
      description: description,
      success_url: MOYASAR_SUCCESS_URL,
      callback_url: MOYASAR_CALLBACK_URL,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: MOYASAR_URL,
      auth: {
        username: MOYASAR_SECRET_KEY,
        password: "",
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        res.status(201).json({ status: "success", data: response.data });
      })
      .catch((err) => {
        console.error(err.response.data);
        throw new ApiError(400, err.message);
      });
  }
);

// make invoice payed

export const makePayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("=".repeat(20));
    console.log("req body", req.body);
    next();
  }
);
