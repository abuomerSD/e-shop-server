import { Model, DataTypes, Optional } from "sequelize";
import slugify from "slugify";
import sequelize from "../config/sequelize.config";

// 1️⃣ Attribute interface (fields in DB)
export interface BrandAttributes {
  id: string;
  name: string;
  slug?: string | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Fields allowed during creation
export interface BrandCreationAttributes
  extends Optional<BrandAttributes, "id" | "slug" | "image"> {}

// 3️⃣ Sequelize model typing
class Brand
  extends Model<BrandAttributes, BrandCreationAttributes>
  implements BrandAttributes
{
  public id!: string;
  public name!: string;
  public slug!: string | null;
  public image!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Model initialization (TS-safe)
Brand.init(
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Brands",
    timestamps: true,
    hooks: {
      beforeSave: async (brand: Brand) => {
        if (brand.changed("name")) {
          brand.slug = slugify(brand.name, { lower: true });
        }
      },
    },
  }
);

export default Brand;
