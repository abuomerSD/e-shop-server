import { expect } from "chai";
import { login } from "../src/utils/authForTests";
import { setToken } from "../src/utils/axiosInstance";
import api from "../src/utils/axiosInstance";
import Category, { CategoryAttributes } from "../src/models/category.model";

describe("subCategories API E2E Tests", () => {
  let createdSubCategoryId = "";
  let categoryId = "";
  let subCategory = { name: "", categoryId: "" };
  let categories: CategoryAttributes[] = [];

  before(async () => {
    const token = await login();
    setToken(token);

    // get all categories
    categories = await Category.findAll();

    if (!categories) {
      throw new Error(
        "No Categories Found, Please At Some Before Testing SubCategories"
      );
    }

    categoryId = categories[0].id;

    subCategory = {
      name: `subCategory-${Date.now()}`,
      categoryId,
    };
  });

  // GET /api/v1/subCategories
  it("should get all subCategories from the database", async () => {
    const res = await api.get(`/subCategories`);
    expect(res.data.data).to.be.an("array");
  });

  // POST /api/v1/subCategories
  it("should create a new subCategory", async () => {
    const res = await api.post(`/subCategories`, subCategory);
    expect(res.data.data).to.include({ name: subCategory.name });
    createdSubCategoryId = res.data.data.id;
  });

  // GET /api/v1/subCategories/:id
  it("should return specific subCategory by the id", async () => {
    const res = await api.get(`/subCategories/${createdSubCategoryId}`);
    expect(res.data.data).to.include({ name: subCategory.name });
  });

  // PUT /api/v1/subCategories/:id
  it("should update specific subCategory by the id", async () => {
    const newsubCategory = {
      name: `subCategory-${Date.now()}`,
      categoryId: categories[1].id,
    };

    const res = await api.put(
      `/subCategories/${createdSubCategoryId}`,
      newsubCategory
    );
    expect(res.data.data).to.include({ name: newsubCategory.name });
  });

  // DELETE /api/v1/subCategories/:id
  it("should delete specific subCategory by the id", async () => {
    const res = await api.delete(`/subCategories/${createdSubCategoryId}`);
    expect(res.data.data).to.include({ id: createdSubCategoryId });
  });
});
