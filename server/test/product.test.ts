import { expect } from "chai";
import { login } from "../src/utils/authForTests";
import { setToken } from "../src/utils/axiosInstance";
import api from "../src/utils/axiosInstance";
import Category from "../src/models/category.model";

let product = {
  name: `product-${Date.now()}`,
  categoryId: "",
  description: "product description",
};

describe("products API E2E Tests", () => {
  let createdProductId = "";

  before(async () => {
    const token = await login();
    setToken(token);
    const res = await api.post(`/categories`, {
      name: `Category-${Date.now()}`,
    });
    console.log("res data", res.data);
    product.categoryId = res.data.data.id;
  });

  // GET /api/v1/products
  it("should get all products from the database", async () => {
    const res = await api.get(`/products`);
    expect(res.data.data).to.be.an("array");
  });

  // POST /api/v1/products
  it("should create a new product", async () => {
    console.log("product", product);
    try {
      const res = await api.post(`/products`, product);
      console.log("post response", res.data);
      expect(res.data.data).to.include({ name: product.name });
      createdProductId = res.data.data.id;
    } catch (error: any) {
      console.log(error.message);
    }
  });

  // GET /api/v1/products/:id
  it("should return specific product by the id", async () => {
    const res = await api.get(`/products/${createdProductId}`);
    expect(res.data.data).to.include({ name: product.name });
  });

  // PUT /api/v1/products/:id
  it("should update specific product by the id", async () => {
    const newproduct = {
      name: `product-${Date.now()}`,
    };

    const res = await api.put(`/products/${createdProductId}`, newproduct);
    expect(res.data.data).to.include({ name: newproduct.name });
  });

  // DELETE /api/v1/products/:id
  it("should delete specific product by the id", async () => {
    const res = await api.delete(`/products/${createdProductId}`);
    expect(res.data.data).to.include({ id: createdProductId });
  });

  after(async () => {
    const category = await Category.findOne({
      where: {
        id: product.categoryId,
      },
    });
    await category?.destroy();
  });
});
