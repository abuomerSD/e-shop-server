import { http } from "../http";
import type {
  ICategory,
  ICategoryCreate,
  IApiResponse,
} from "../../types/types";

export const categoryService = {
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
    const url = `/categories${queryString ? `?${queryString}` : ""}`;

    return await http.get<ICategory[]>(url);
  },

  getById: async (id: string): Promise<IApiResponse<ICategory>> => {
    return await http.get<ICategory>(`/categories/${id}`);
  },

  create: async (
    data: ICategoryCreate,
    imageFile?: File
  ): Promise<IApiResponse<ICategory>> => {
    if (imageFile) {
      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append("name", data.name);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      return await http.upload<ICategory>("/categories", formData);
    } else {
      // Standard JSON request without image
      return await http.post<ICategory>("/categories", data);
    }
  },

  update: async (
    id: string,
    data: Partial<ICategoryCreate>,
    imageFile?: File
  ): Promise<IApiResponse<ICategory>> => {
    if (imageFile) {
      // Create FormData for multipart upload with image
      const formData = new FormData();

      // Append text fields
      if (data.name) formData.append("name", data.name);
      if (data.image) formData.append("image", data.image);

      // Append image file
      formData.append("image", imageFile);

      return await http.uploadPut<ICategory>(`/categories/${id}`, formData);
    } else {
      // Standard JSON request without image
      return await http.put<ICategory>(`/categories/${id}`, data);
    }
  },

  delete: async (id: string): Promise<IApiResponse<void>> => {
    return await http.delete<void>(`/categories/${id}`);
  },

  uploadImage: async (
    id: string,
    formData: FormData
  ): Promise<IApiResponse<ICategory>> => {
    return await http.upload<ICategory>(`/categories/${id}/image`, formData);
  },
};
