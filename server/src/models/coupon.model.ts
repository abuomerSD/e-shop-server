// src/models/coupon.model.ts

import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize.config";

// 1️⃣ Attributes
export interface CouponAttributes {
  id: string;
  name: string;
  expire?: Date | null;
  discount?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Creation Attributes (optional fields during creation)
export interface CouponCreationAttributes
  extends Optional<CouponAttributes, "id" | "expire" | "discount"> {}

// 3️⃣ Coupon Model
class Coupon
  extends Model<CouponAttributes, CouponCreationAttributes>
  implements CouponAttributes
{
  public id!: string;
  public name!: string;
  public expire!: Date | null;
  public discount!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Initialize Coupon
Coupon.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Coupons",
    timestamps: true,
  }
);

export default Coupon;
