import { expect } from "chai";
import { login } from "../src/utils/authForTests";
import { setToken } from "../src/utils/axiosInstance";
import api from "../src/utils/axiosInstance";

const user = {
  name: `User-${Date.now()}`,
  email: `test${Date.now()}@yahoo.com`,
  password: "jkE#$FDfggfd",
};

describe("Users API E2E Tests", () => {
  let createdUserId = "";

  before(async () => {
    const token = await login();
    setToken(token); 
  });

  // GET /api/v1/users
  it("should get all users from the database", async () => {
    const res = await api.get("/users");
    expect(res.data.data).to.be.an("array");
  });

  // POST /api/v1/users
  it("should create a new user", async () => {
    const res = await api.post("/users", user);
    expect(res.data.data).to.include({ name: user.name });
    createdUserId = res.data.data.id;
  });

  // GET /api/v1/users/:id
  it("should return specific user by the id", async () => {
    const res = await api.get(`/users/${createdUserId}`);
    expect(res.data.data).to.include({ name: user.name });
  });

  // PUT /api/v1/users/:id
  it("should update specific user by the id", async () => {
    const newUser = {
      name: `User-${Date.now()}`,
      email: `test${Date.now()}@gmail.com`,
    };

    const res = await api.put(`/users/${createdUserId}`, newUser);
    expect(res.data.data).to.include({ name: newUser.name });
  });

  // DELETE /api/v1/users/:id
  it("should delete specific user by the id", async () => {
    const res = await api.delete(`/users/${createdUserId}`);
    expect(res.data.data).to.include({ id: createdUserId });
  });
});
