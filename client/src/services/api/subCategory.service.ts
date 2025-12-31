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
    categoryId?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.search) searchParams.append("keyword", params.search);
    if (params?.categoryId)
      searchParams.append("categoryId", params.categoryId);

    const queryString = searchParams.toString();
    const url = `/subCategories${queryString ? `?${queryString}` : ""}`;

    return await http.get<ISubCategory[]>(url);
  },

  getById: async (id: string): Promise<IApiResponse<ISubCategory>> => {
    return await http.get<ISubCategory>(`/subCategories/${id}`);
  },

  create: async (
    data: ISubCategoryCreate
  ): Promise<IApiResponse<ISubCategory>> => {
    return await http.post<ISubCategory>("/subCategories", data);
  },

  update: async (
    id: string,
    data: Partial<ISubCategoryCreate>
  ): Promise<IApiResponse<ISubCategory>> => {
    return await http.put<ISubCategory>(`/subCategories/${id}`, data);
  },

  delete: async (id: string): Promise<IApiResponse<void>> => {
    return await http.delete<void>(`/subCategories/${id}`);
  },

  uploadImage: async (
    id: string,
    formData: FormData
  ): Promise<IApiResponse<ISubCategory>> => {
    return await http.upload<ISubCategory>(
      `/subCategories/${id}/image`,
      formData
    );
  },
};
