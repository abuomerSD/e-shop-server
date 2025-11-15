import { expect } from "chai";
import axios from "axios";
import { API_TEST_URL } from "../src/config/env.config.js";

const user = {
  name: `User-${Date.now()}`,
  email: `test${Date.now()}@yahoo.com`,
  password: "jkE#$FDfg2gfd3ds",
};

describe("Auth API E2E Tests", () => {
  // signup test
  it("should create a new user and return a token", async () => {
    try {
      const res = await axios.post(`${API_TEST_URL}/auth/signup`, user);
      expect(res.data.data).to.include({ name: user.name });
      expect(res.data.data).to.have.property("token");
    } catch (error) {
      console.log(error.message);
    }
  });

  // login test
  it("should return the logged user with the token", async () => {
    try {
      const res = await axios.post(`${API_TEST_URL}/auth/login`, {
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      console.log(error.message);
    }
  });
});
