import {
  Model,
  DataTypes,
  Optional
} from "sequelize";
import slugify from "slugify";
import bcrypt from "bcrypt";
import sequelize from "../config/sequelize.config";

// 1️⃣ Attributes interface (all fields in DB)
export interface UserAttributes {
  id?: string;
  name?: string;
  slug?: string;
  email: string;
  phone?: string;
  profileImg?: string;
  password?: string;
  passwordChangedAt?: Date | null;
  passwordResetCode?: string | null;
  passwordResetExpires?: Date | null;
  passwordResetVerified?: boolean;
  role?: "user" | "manager" | "admin";
  active?: boolean;
}

// 2️⃣ Creation attributes (id auto-generated)
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "slug" | "role" | "active"> {}

export interface UserInstance
  extends Model<UserAttributes>,
    UserAttributes {}

// 3️⃣ Model class with typing
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public slug!: string;
  public email!: string;
  public phone!: string;
  public profileImg!: string;
  public password!: string;
  public passwordChangedAt!: Date;
  public passwordResetCode!: string;
  public passwordResetExpires!: Date;
  public passwordResetVerified!: boolean;
  public role!: "user" | "manager" | "admin";
  public active!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      allowNull: false,
      unique: true,
    },
    phone: DataTypes.STRING,
    profileImg: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordChangedAt: DataTypes.DATE,
    passwordResetCode: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
    passwordResetVerified: DataTypes.BOOLEAN,
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
    sequelize,
    modelName: "User",
    timestamps: true,
    hooks: {
      beforeSave: async (user: User) => {
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
