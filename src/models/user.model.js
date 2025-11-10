// models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import bcrypt from "bcrypt";
import slugify from "slugify";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID, // نوع UUID
      defaultValue: DataTypes.UUIDV4, // يولد UUID تلقائيًا
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    profileImg: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
    },
    passwordResetCode: {
      type: DataTypes.STRING,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
    },
    passwordResetVerified: {
      type: DataTypes.BOOLEAN,
    },
    role: {
      type: DataTypes.ENUM("user", "manager", "admin"),
      defaultValue: "user",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("name")) {
          user.slug = slugify(user.name, { lower: true });
        }

        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
    },
  }
);

export default User;
