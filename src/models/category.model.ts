import { Model, DataTypes, Optional } from "sequelize";
import slugify from "slugify";
import sequelize from "../config/sequelize.config";

// 1️⃣ Attribute interface (fields in DB)
export interface CategoryAttributes {
  id: string;
  name: string;
  slug?: string | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Fields allowed during creation
export interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id" | "slug" | "image"> {}

// 3️⃣ Sequelize model typing
class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: string;
  public name!: string;
  public slug!: string;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Model initialization (TS-safe)
Category.init(
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
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: true,
    hooks: {
      beforeSave: async (category: Category) => {
        if (category.changed("name")) {
          category.slug = slugify(category.name, { lower: true });
        }
      },
    },
  }
);

export default Category;
