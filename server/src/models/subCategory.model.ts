import { Model, DataTypes, Optional } from "sequelize";
import slugify from "slugify";
import sequelize from "../config/sequelize.config";

// 1️⃣ Attributes in DB
export interface SubCategoryAttributes {
  id: string;
  name: string;
  slug?: string | null;
  categoryId: string; // FK
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Allowed fields on creation
export interface SubCategoryCreationAttributes
  extends Optional<SubCategoryAttributes, "id" | "slug"> {}

// 3️⃣ Model definition
class SubCategory
  extends Model<SubCategoryAttributes, SubCategoryCreationAttributes>
  implements SubCategoryAttributes
{
  public id!: string;
  public name!: string;
  public slug!: string | null;
  public categoryId!: string;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Model initialization (TS-safe)
SubCategory.init(
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
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "SubCategories",
    timestamps: true,
    hooks: {
      beforeSave: async (sub: SubCategory) => {
        if (sub.changed("name")) {
          sub.slug = slugify(sub.name, { lower: true });
        }
      },
    },
  }
);

export default SubCategory;
