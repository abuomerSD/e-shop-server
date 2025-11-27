import axios from "axios";
import { API_TEST_URL } from "../config/env.config";

// to get the token to use it in e2e tests
export const login = async () => {
  const loginBody = { email: "test123@gmail.com", password: "dsdrferwrwe" };
  const res = await axios.post(`${API_TEST_URL}/auth/login`, loginBody);
  return res.data.data.token;
};
