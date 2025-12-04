// src/models/review.model.ts

import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize.config";

import User from "./user.model";
import Product from "./product.model";

// 1️⃣ Attributes
export interface ReviewAttributes {
  id: string;
  title?: string | null;
  ratings: number;

  userId: string;
  productId: string;

  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Creation Attributes
export interface ReviewCreationAttributes
  extends Optional<ReviewAttributes, "id" | "title"> {}

// 3️⃣ Review Model
class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  public id!: string;
  public title!: string | null;
  public ratings!: number;

  public userId!: string;
  public productId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Initialize Review
Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    ratings: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },

    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Products", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "Reviews",
    timestamps: true,
  }
);

// 5️⃣ Associations
Review.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Review.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

Product.hasMany(Review, {
  foreignKey: "productId",
  as: "reviews",
});

export default Review;
