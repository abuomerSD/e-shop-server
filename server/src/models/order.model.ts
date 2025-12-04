// src/models/order.model.ts

import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize.config";

import User from "./user.model";
import Product from "./product.model";

// 1️⃣ Attributes
export interface OrderAttributes {
  id: string;

  taxPrice?: number | null;
  shippingAddress?: object | null;
  shippingPrice?: number | null;
  totalOrderPrice?: number | null;

  paymentMethodType?: "card" | "cash";
  isPaid?: boolean;
  paidAt?: Date | null;

  isDelivered?: boolean;
  deliveredAt?: Date | null;

  userId: string;

  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Creation Attributes
export interface OrderCreationAttributes
  extends Optional<
    OrderAttributes,
    | "id"
    | "taxPrice"
    | "shippingAddress"
    | "shippingPrice"
    | "totalOrderPrice"
    | "paymentMethodType"
    | "isPaid"
    | "paidAt"
    | "isDelivered"
    | "deliveredAt"
  > {}

// 3️⃣ Order Model
class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: string;

  public taxPrice!: number | null;
  public shippingAddress!: object | null;
  public shippingPrice!: number | null;
  public totalOrderPrice!: number | null;

  public paymentMethodType!: "card" | "cash";
  public isPaid!: boolean;
  public paidAt!: Date | null;

  public isDelivered!: boolean;
  public deliveredAt!: Date | null;

  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Initialize Order
Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    taxPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    shippingAddress: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    shippingPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    totalOrderPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    paymentMethodType: {
      type: DataTypes.ENUM("card", "cash"),
      defaultValue: "cash",
    },

    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    isDelivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "Orders",
    timestamps: true,
  }
);

// 5️⃣ Associations
Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Order.belongsToMany(Product, {
  through: "OrderItems",
  foreignKey: "orderId",
  otherKey: "productId",
  as: "products",
});

export default Order;
