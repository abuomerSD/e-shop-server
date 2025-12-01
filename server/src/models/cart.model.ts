import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize.config";

import User from "./user.model";
import Product from "./product.model";

// 1️⃣ DB Attributes
export interface CartAttributes {
  id: string;
  userId: string;

  totalCartPrice?: number | null;
  totalPriceAfterDiscount?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Fields allowed during creation
export interface CartCreationAttributes
  extends Optional<
    CartAttributes,
    "id" | "totalCartPrice" | "totalPriceAfterDiscount"
  > {}

// 3️⃣ Sequelize Model
class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: string;
  public userId!: string;

  public totalCartPrice!: number | null;
  public totalPriceAfterDiscount!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Initialize Cart
Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    totalCartPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalPriceAfterDiscount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "Carts",
    timestamps: true,
  }
);

// 5️⃣ Associations
Cart.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Cart.belongsToMany(Product, {
  through: "CartItems",
  foreignKey: "cartId",
  otherKey: "productId",
  as: "products",
});

export default Cart;
