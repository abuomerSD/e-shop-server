import { expect } from "chai";
import { login } from "../src/utils/authForTests";
import { setToken } from "../src/utils/axiosInstance";
import api from "../src/utils/axiosInstance";

const brand = {
  name: `brand-${Date.now()}`,
};

describe("Brands API E2E Tests", () => {
  let createdBrandId = "";

  before(async () => {
    const token = await login();
    setToken(token);
  });

  // GET /api/v1/brands
  it("should get all brands from the database", async () => {
    const res = await api.get(`/brands`);
    expect(res.data.data).to.be.an("array");
  });

  // POST /api/v1/brands
  it("should create a new brand", async () => {
    const res = await api.post(`/brands`, brand);
    expect(res.data.data).to.include({ name: brand.name });
    createdBrandId = res.data.data.id;
  });

  // GET /api/v1/brands/:id
  it("should return specific brand by the id", async () => {
    const res = await api.get(`/brands/${createdBrandId}`);
    expect(res.data.data).to.include({ name: brand.name });
  });

  // PUT /api/v1/brands/:id
  it("should update specific brand by the id", async () => {
    const newbrand = {
      name: `brand-${Date.now()}`,
    };

    const res = await api.put(`/brands/${createdBrandId}`, newbrand);
    expect(res.data.data).to.include({ name: newbrand.name });
  });

  // DELETE /api/v1/brands/:id
  it("should delete specific brand by the id", async () => {
    const res = await api.delete(`/brands/${createdBrandId}`);
    expect(res.data.data).to.include({ id: createdBrandId });
  });
});
