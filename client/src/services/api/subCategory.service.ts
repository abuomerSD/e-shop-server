import { http } from "../http";
import type {
  ISubCategory,
  ISubCategoryCreate,
  IApiResponse,
} from "../../types/types";

export const subCategoryService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    searchCol?: string;
    category?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.search) searchParams.append("search", params.search);
    if (params?.searchCol) searchParams.append("searchCol", params.searchCol);
    if (params?.category) searchParams.append("category", params.category);

    const queryString = searchParams.toString();
    const url = `/subcategories${queryString ? `?${queryString}` : ""}`;

    return await http.get<ISubCategory[]>(url);
  },

  getById: async (id: string): Promise<IApiResponse<ISubCategory>> => {
    return await http.get<ISubCategory>(`/subcategories/${id}`);
  },

  create: async (
    data: ISubCategoryCreate,
    imageFile?: File
  ): Promise<IApiResponse<ISubCategory>> => {
    if (imageFile) {
      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("categoryId", data.categoryId);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      return await http.upload<ISubCategory>("/subcategories", formData);
    } else {
      // Standard JSON request without image
      return await http.post<ISubCategory>("/subcategories", data);
    }
  },

  update: async (
    id: string,
    data: Partial<ISubCategoryCreate>,
    imageFile?: File
  ): Promise<IApiResponse<ISubCategory>> => {
    if (imageFile) {
      // Create FormData for multipart upload with image
      const formData = new FormData();

      // Append text fields
      if (data.name) formData.append("name", data.name);
      if (data.categoryId) formData.append("categoryId", data.categoryId);
      if (data.image) formData.append("image", data.image);

      // Append image file
      formData.append("image", imageFile);

      return await http.uploadPut<ISubCategory>(
        `/subcategories/${id}`,
        formData
      );
    } else {
      // Standard JSON request without image
      return await http.put<ISubCategory>(`/subcategories/${id}`, data);
    }
  },

  delete: async (id: string): Promise<IApiResponse<void>> => {
    return await http.delete<void>(`/subcategories/${id}`);
  },
};
