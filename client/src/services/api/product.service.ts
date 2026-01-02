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

  create: async (
    data: IProductCreate,
    imageCover?: File,
    images?: File[]
  ): Promise<IApiResponse<IProduct>> => {
    if (imageCover || (images && images.length > 0)) {
      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.quantity !== undefined)
        formData.append("quantity", data.quantity.toString());
      if (data.price !== undefined)
        formData.append("price", data.price.toString());
      if (data.priceAfterDiscount !== undefined)
        formData.append(
          "priceAfterDiscount",
          data.priceAfterDiscount.toString()
        );
      if (data.categoryId) formData.append("categoryId", data.categoryId);
      if (data.brandId) formData.append("brandId", data.brandId);
      if (data.colors) formData.append("colors", JSON.stringify(data.colors));

      if (imageCover) {
        formData.append("imageCover", imageCover);
      }

      if (images && images.length > 0) {
        images.forEach((image) => {
          formData.append("images", image);
        });
      }

      return await http.upload<IProduct>("/products", formData);
    } else {
      // Standard JSON request without images
      return await http.post<IProduct>("/products", data);
    }
  },

  update: async (
    id: string,
    data: Partial<IProductCreate>,
    imageCover?: File,
    images?: File[]
  ): Promise<IApiResponse<IProduct>> => {
    if (imageCover || (images && images.length > 0)) {
      // Create FormData for multipart upload
      const formData = new FormData();
      if (data.title) formData.append("title", data.title);
      if (data.description) formData.append("description", data.description);
      if (data.quantity !== undefined)
        formData.append("quantity", data.quantity.toString());
      if (data.price !== undefined)
        formData.append("price", data.price.toString());
      if (data.priceAfterDiscount !== undefined)
        formData.append(
          "priceAfterDiscount",
          data.priceAfterDiscount.toString()
        );
      if (data.categoryId) formData.append("categoryId", data.categoryId);
      if (data.brandId) formData.append("brandId", data.brandId);
      if (data.colors) formData.append("colors", JSON.stringify(data.colors));

      if (imageCover) {
        formData.append("imageCover", imageCover);
      }

      if (images && images.length > 0) {
        images.forEach((image) => {
          formData.append("images", image);
        });
      }

      return await http.upload<IProduct>(`/products/${id}`, formData);
    } else {
      // Standard JSON request without images
      return await http.put<IProduct>(`/products/${id}`, data);
    }
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
