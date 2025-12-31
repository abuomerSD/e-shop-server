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
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.search) searchParams.append("keyword", params.search);

    const queryString = searchParams.toString();
    const url = `/categories${queryString ? `?${queryString}` : ""}`;

    return await http.get<ICategory[]>(url);
  },

  getById: async (id: string): Promise<IApiResponse<ICategory>> => {
    return await http.get<ICategory>(`/categories/${id}`);
  },

  create: async (data: ICategoryCreate): Promise<IApiResponse<ICategory>> => {
    return await http.post<ICategory>("/categories", data);
  },

  update: async (
    id: string,
    data: Partial<ICategoryCreate>
  ): Promise<IApiResponse<ICategory>> => {
    return await http.put<ICategory>(`/categories/${id}`, data);
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
