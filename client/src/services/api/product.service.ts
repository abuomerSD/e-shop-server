import { http } from "../http";
import type { IProduct, IProductCreate, IApiResponse } from "../../types/types";

export const productService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.search) searchParams.append("keyword", params.search);
    if (params?.categoryId) searchParams.append("category", params.categoryId);
    if (params?.brandId) searchParams.append("brand", params.brandId);
    if (params?.minPrice)
      searchParams.append("price[gte]", params.minPrice.toString());
    if (params?.maxPrice)
      searchParams.append("price[lte]", params.maxPrice.toString());
    if (params?.sort) searchParams.append("sort", params.sort);

    const queryString = searchParams.toString();
    const url = `/products${queryString ? `?${queryString}` : ""}`;

    return await http.get<IProduct[]>(url);
  },

  getById: async (id: string): Promise<IApiResponse<IProduct>> => {
    return await http.get<IProduct>(`/products/${id}`);
  },

  create: async (data: IProductCreate): Promise<IApiResponse<IProduct>> => {
    return await http.post<IProduct>("/products", data);
  },

  update: async (
    id: string,
    data: Partial<IProductCreate>
  ): Promise<IApiResponse<IProduct>> => {
    return await http.put<IProduct>(`/products/${id}`, data);
  },

  delete: async (id: string): Promise<IApiResponse<void>> => {
    return await http.delete<void>(`/products/${id}`);
  },

  uploadImages: async (
    id: string,
    formData: FormData
  ): Promise<IApiResponse<IProduct>> => {
    return await http.upload<IProduct>(`/products/${id}/images`, formData);
  },
};
