/* eslint-disable import/extensions */
import asyncHandler from "express-async-handler";

import Cart from "../models/cart.model";
import { Request, Response } from "express";
import Product from "../models/product.model";
import CartItem from "../models/cartItems.model";
import Coupon from "../models/coupon.model";
import ApiError from "../utils/apiError";

/**
 * @desc    Add product to cart
 * @route   POST /api/v1/cart
 * @access  Private/ User
 */
export const addProductToCart = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { productId } = req.body;
    const { quantity } = req.body;

    // find the product
    const product = await Product.findOne({
      where: { id: productId },
    });

    console.log("product", product);

    if (!product) {
      throw new ApiError(400, `Product Not Found`);
    }

    // check if the cart already created
    let cart = await Cart.findOne({ where: { userId } });
    let cartId = null;
    if (cart) {
      cartId = cart.id;
    } else {
      cart = await Cart.create({ userId });
      cartId = cart.id;
    }

    // check if product already added
    const cartItem = await CartItem.findOne({ where: { productId, cartId } });
    if (!cartItem) {
      await CartItem.create({
        cartId,
        productId,
        quantity,
      });
    } else {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    // calculate cart price total
    const totalCartPrice = await calculateCartTotalPrice(cartId);

    // update cart totals
    cart.totalCartPrice = totalCartPrice;
    cart.totalPriceAfterDiscount = totalCartPrice;
    await cart.save();

    // find All cart items
    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });

    res.json({
      status: "success",
      cart,
      cartItems,
    });
  }
);

/**
 * @desc    Apply Coupon to cart
 * @route   POST /api/v1/cart/apply-coupon
 * @access  Private/ User
 */
export const applyCouponToCart = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, cartId } = req.body;
    // get the coupon from db
    const coupon = await Coupon.findOne({ where: { name } });

    // check if coupen expired
    if (coupon?.expire && Date.now() > coupon?.expire?.getTime()) {
      throw new ApiError(400, "The Applied Coupon Has Expired");
    }

    // get the cart from db
    const cart = await Cart.findOne({ where: { id: cartId } });

    // check if discount already applied
    if (cart?.totalPriceAfterDiscount && cart.totalPriceAfterDiscount > 0) {
      throw new ApiError(400, "Discount Already applied to this cart");
    }

    if (coupon && cart && cart.totalCartPrice && coupon.discount) {
      if (!cart.totalPriceAfterDiscount) {
        let discount = cart.totalCartPrice * (coupon.discount / 100); // discount is percentage
        cart.totalPriceAfterDiscount = cart.totalCartPrice - discount;
        await cart.save();
      }
    }

    res.status(200).json({
      status: "success",
      cart,
    });
  }
);

/**
 * @desc    Get Cart For the logged User
 * @route   GET /api/v1/cart
 * @access  Private/ User
 */
export const getLoggedUserCart = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          as: "cartItems",
          attributes: ["productId", "cartId", "quantity"],
          include: [
            {
              model: Product,
              as: "product",
              foreignKey: "productId",
              attributes: ["title"],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      cart,
    });
  }
);

/**
 * @desc    Delete Logged user cart and cart items
 * @route   DELETE /api/v1/cart
 * @access  Private/ User
 */
export const clearLoggedUserCart = asyncHandler(
  async (req: Request, res: Response) => {
    const { cartId } = req.body;
    const cart = await Cart.findOne({ where: { id: cartId } });
    if (cart) {
      await cart.destroy();
    }

    res.status(200).json({
      status: "success",
    });
  }
);

/**
 * @desc    Update Item Quantity
 * @route   PUT /api/v1/cart/:productId
 * @access  Private/ User
 */
export const updateItemQuantity = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { cartId, quantity } = req.body;

    // update qty
    const cartItem = await CartItem.findOne({ where: { cartId, productId } });
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
    }

    // update cart total price
    const cart = await Cart.findOne({ where: { id: cartId } });
    if (cart) {
      cart.totalCartPrice = await calculateCartTotalPrice(cartId);
      cart.totalPriceAfterDiscount = 0;
      await cart.save();
    }

    res.status(200).json({
      status: "success",
      cart,
    });
  }
);

/**
 * @desc    Delete Item From Cart
 * @route   DELETE /api/v1/cart/:productId
 * @access  Private/ User
 */
export const deleteItemFromCart = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { cartId } = req.body;

    // delete product from cart
    const cartItem = await CartItem.findOne({ where: { productId, cartId } });
    if (cartItem) {
      await cartItem?.destroy();
    }

    // update cart total
    const cart = await Cart.findOne({ where: { id: cartId } });
    if (cart) {
      cart.totalCartPrice = await calculateCartTotalPrice(cartId);
      cart.totalPriceAfterDiscount = 0;

      // delete cart if the total = 0
      if (cart.totalCartPrice === 0) {
        await cart.destroy();
      } else {
        await cart.save();
      }
    }

    res.status(200).json({
      status: "success",
    });
  }
);

async function calculateCartTotalPrice(cartId: string): Promise<number> {
  let totalCartPrice = 0;

  // find cart items
  const cartItems = await CartItem.findAll({ where: { cartId } });

  for (const item of cartItems) {
    const product = await Product.findOne({
      where: { id: item.productId },
    });

    if (product && product.price) {
      totalCartPrice += product.price * item.quantity;
    }
  }

  return totalCartPrice;
}
