import {
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_NAME,
  DEFAULT_USER_PASSWORD,
} from "../config/env.config";
import User from "../models/user.model";

export async function insertDefaultUser() {
  try {
    const usersCount = await User.count({});
    if (usersCount === 0) {
      await User.create({
        name: DEFAULT_USER_NAME || "",
        email: DEFAULT_USER_EMAIL || "",
        password: DEFAULT_USER_PASSWORD || "",
        role: "admin",
      });
      console.log("Default User Created");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
