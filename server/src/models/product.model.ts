import { Model, DataTypes, Optional } from "sequelize";
import slugify from "slugify";
import sequelize from "../config/sequelize.config";

import Category from "./category.model";
import SubCategory from "./subCategory.model";
import Brand from "./brand.model";

// 1️⃣ DB Attributes
export interface ProductAttributes {
  id: string;
  title: string;
  slug?: string | null;
  description: string;
  quantity?: number | null;
  sold?: number | null;
  price?: number | null;
  priceAfterDiscount?: number | null;
  colors?: any[] | null;
  imageCover?: string | null;
  images?: any[] | null;
  ratingsAverage?: number | null;
  ratingsQuantity?: number | null;

  categoryId?: string | null;
  brandId?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Fields allowed during creation
export interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    | "id"
    | "slug"
    | "quantity"
    | "sold"
    | "price"
    | "priceAfterDiscount"
    | "colors"
    | "imageCover"
    | "images"
    | "ratingsAverage"
    | "ratingsQuantity"
    | "categoryId"
    | "brandId"
  > {}

// 3️⃣ Sequelize Model
class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: string;
  public title!: string;
  public slug!: string | null;
  public description!: string;

  public quantity!: number | null;
  public sold!: number | null;
  public price!: number | null;
  public priceAfterDiscount!: number | null;

  public colors!: any[] | null;
  public imageCover!: string | null;
  public images!: any[] | null;

  public ratingsAverage!: number | null;
  public ratingsQuantity!: number | null;

  public categoryId!: string | null;
  public brandId!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Initialize Product
Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    priceAfterDiscount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    colors: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    imageCover: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    ratingsAverage: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    ratingsQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Categories",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Brands",
        key: "id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "Products",
    timestamps: true,
    hooks: {
      beforeSave: (product: Product) => {
        if (product.changed("title")) {
          product.slug = slugify(product.title, { lower: true });
        }
      },
    },
  }
);

// 5️⃣ Associations
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Product.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });

Product.belongsToMany(SubCategory, {
  through: "ProductSubcategories",
  foreignKey: "productId",
  otherKey: "subCategoryId",
  as: "subCategories",
});

export default Product;
