import { expect } from "chai";
import { login } from "../src/utils/authForTests";
import { setToken } from "../src/utils/axiosInstance";
import api from "../src/utils/axiosInstance";

const product = {
  name: `product-${Date.now()}`,
};

describe("products API E2E Tests", () => {
  let createdProductId = "";

  before(async () => {
    const token = await login();
    setToken(token);
  });

  // GET /api/v1/products
  it("should get all products from the database", async () => {
    const res = await api.get(`/products`);
    expect(res.data.data).to.be.an("array");
  });

  // POST /api/v1/products
  it("should create a new product", async () => {
    const res = await api.post(`/products`, product);
    expect(res.data.data).to.include({ name: product.name });
    createdProductId = res.data.data.id;
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
});
