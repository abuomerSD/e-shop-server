import { http } from "../http";
import type { IBrand, IBrandCreate, IApiResponse } from "../../types/types";

export const brandService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    searchCol?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.search) searchParams.append("search", params.search);
    if (params?.searchCol) searchParams.append("searchCol", params.searchCol);

    const queryString = searchParams.toString();
    const url = `/brands${queryString ? `?${queryString}` : ""}`;

    return await http.get<IBrand[]>(url);
  },

  getById: async (id: string): Promise<IApiResponse<IBrand>> => {
    return await http.get<IBrand>(`/brands/${id}`);
  },

  create: async (
    data: IBrandCreate,
    imageFile?: File
  ): Promise<IApiResponse<IBrand>> => {
    if (imageFile) {
      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append("name", data.name);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      return await http.upload<IBrand>("/brands", formData);
    } else {
      // Standard JSON request without image
      return await http.post<IBrand>("/brands", data);
    }
  },

  update: async (
    id: string,
    data: Partial<IBrandCreate>,
    imageFile?: File
  ): Promise<IApiResponse<IBrand>> => {
    if (imageFile) {
      // Create FormData for multipart upload
      const formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      return await http.uploadPut<IBrand>(`/brands/${id}`, formData);
    } else {
      // Standard JSON request without image
      return await http.put<IBrand>(`/brands/${id}`, data);
    }
  },

  delete: async (id: string): Promise<IApiResponse<void>> => {
    return await http.delete<void>(`/brands/${id}`);
  },

  uploadImage: async (
    id: string,
    formData: FormData
  ): Promise<IApiResponse<IBrand>> => {
    return await http.upload<IBrand>(`/brands/${id}/image`, formData);
  },
};
