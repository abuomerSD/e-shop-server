// models/cartItem.model.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config";

class CartItem extends Model {}

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
    },
  },
  {
    sequelize,
    tableName: "CartItems",
  }
);

export default CartItem;
