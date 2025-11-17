import { DataTypes } from "sequelize";
import slugify from "slugify";

import sequelize from "../config/sequelize.config.js";

const Category = sequelize.define(
  "Category",
  {
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
    timestamps: true,
    hooks: {
      beforeSave: async (category) => {
        if (category.changed("name")) {
          category.slug = slugify(category.name, { lower: true });
        }
      },
    },
  }
);

export default Category;
