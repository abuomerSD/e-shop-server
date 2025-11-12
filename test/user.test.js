import { expect } from "chai";
import axios from "axios";
import { API_TEST_URL } from "../src/config/env.config.js";

const user = {
  name: `User-${Date.now()}`,
  email: `test${Date.now()}@yahoo.com`,
  password: "jkE#$FDfggfd",
};

const userId = describe("Users API E2E Tests", () => {
  let createdUserId = "";
  // GET /api/v1/users
  it("should get all users from the database", async () => {
    try {
      const res = await axios.get(`${API_TEST_URL}/users`);
      expect(res.data.data).to.be.an("array");
    } catch (error) {
      console.log(error);
    }
  });

  // POST /api/v1/users
  it("should create a new user", async () => {
    try {
      const res = await axios.post(`${API_TEST_URL}/users`, user);
      expect(res.data.data).to.include({ name: user.name });
      createdUserId = res.data.data.id;
    } catch (error) {
      if (error.response) {
        expect(error.response.data.message).to.equal("email must be unique");
      } else {
        throw error;
      }
    }
  });

  // GET /api/v1/users/:id
  it("should return specific user by the id", async () => {
    try {
      const res = await axios.get(`${API_TEST_URL}/users/${createdUserId}`);
      expect(res.data.data).to.include({ name: user.name });
    } catch (error) {
      console.log(error);
    }
  });

  // PUT /api/v1/users/:id
  it("should update specific user by the id", async () => {
    try {
      const newUser = {
        name: `User-${Date.now()}`,
        email: `test${Date.now()}@gmail.com`,
        password: "kjlkld7973234",
      };

      const res = await axios.put(
        `${API_TEST_URL}/users/${createdUserId}`,
        newUser
      );
      expect(res.data.data).to.include({ name: newUser.name });
    } catch (error) {
      console.log(error);
    }
  });

  // DELETE /api/v1/users/:id
  it("should delete specific user by the id", async () => {
    try {
      const res = await axios.delete(`${API_TEST_URL}/users/${createdUserId}`);
      expect(res.data.data).to.include({ id: createdUserId });
    } catch (error) {
      console.log(error);
    }
  });
});
