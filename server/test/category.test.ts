import { expect } from "chai";
import { login } from "../src/utils/authForTests";
import { setToken } from "../src/utils/axiosInstance";
import api from '../src/utils/axiosInstance';

const category = {
  name: `Category-${Date.now()}`,
};

describe("Categories API E2E Tests", () => {
  let createdCategoryId = "";

  before(async () => {
    const token = await login();
    setToken(token);
  });

  // GET /api/v1/categories
  it("should get all categories from the database", async () => {
    const res = await api.get(`/categories`);
    expect(res.data.data).to.be.an("array");
  });

  // POST /api/v1/categories
  it("should create a new category", async () => {
    const res = await api.post(`/categories`, category);
    expect(res.data.data).to.include({ name: category.name });
    createdCategoryId = res.data.data.id;
  });

  // GET /api/v1/categories/:id
  it("should return specific category by the id", async () => {
    const res = await api.get(`/categories/${createdCategoryId}`);
    expect(res.data.data).to.include({ name: category.name });
  });

  // PUT /api/v1/categories/:id
  it("should update specific category by the id", async () => {
    const newcategory = {
      name: `category-${Date.now()}`,
    };

    const res = await api.put(`/categories/${createdCategoryId}`, newcategory);
    expect(res.data.data).to.include({ name: newcategory.name });
  });

  // DELETE /api/v1/categories/:id
  it("should delete specific category by the id", async () => {
    const res = await api.delete(`/categories/${createdCategoryId}`);
    expect(res.data.data).to.include({ id: createdCategoryId });
  });
});
