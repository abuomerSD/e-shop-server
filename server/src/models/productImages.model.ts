import { Model, DataTypes, Optional } from "sequelize";
import slugify from "slugify";
import sequelize from "../config/sequelize.config";

import Category from "./category.model";
import SubCategory from "./subCategory.model";
import Brand from "./brand.model";
import Product from "./product.model";

// 1️⃣ DB Attributes
export interface ProductImagesAttributes {
  id: string;
  name: string;
  productId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Fields allowed during creation
export interface ProductCreationAttributes
  extends Optional<ProductImagesAttributes, "id" | "name" | "productId"> {}

// 3️⃣ Sequelize Model
class ProductImages
  extends Model<ProductImagesAttributes, ProductCreationAttributes>
  implements ProductImagesAttributes
{
  public id!: string;
  public name!: string;
  public productId!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Initialize Product
ProductImages.init(
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
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Products",
    timestamps: true,
  }
);

// 5️⃣ Associations
ProductImages.belongsTo(Product);

Product.hasMany(ProductImages);

export default Product;
