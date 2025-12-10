// models/cartItem.model.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize.config";

// 1️⃣ DB Attributes
export interface CartItemAttributes {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;

  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Fields allowed during creation
export interface CartItemCreationAttributes
  extends Optional<CartItemAttributes, "id"> {}

// 3️⃣ Sequelize Model class
class CartItem
  extends Model<CartItemAttributes, CartItemCreationAttributes>
  implements CartItemAttributes
{
  public id!: string;
  public cartId!: string;
  public productId!: string;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Initialize Model
CartItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },

    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Carts",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "CartItems",
    timestamps: true,
  }
);

export default CartItem;
