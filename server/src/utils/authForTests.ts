import axios from "axios";
import { API_TEST_URL } from "../config/env.config";
import User, { UserAttributes } from "../models/user.model";

const loginBody: UserAttributes = {
  name: "admin",
  email: "admin@admin.com",
  password: "password1",
  role: "admin",
};

// to get the token to use it in e2e tests
export const login = async () => {
  await createUser(loginBody);
  const res = await axios.post(`${API_TEST_URL}/auth/login`, loginBody);
  return res.data.token;
};

const createUser = async (user: UserAttributes) => {
  // check if the any user already exists
  const usersCount = await User.count({});

  console.log("users count", usersCount);

  if (usersCount < 1) {
    await User.create(user);
  }
};
