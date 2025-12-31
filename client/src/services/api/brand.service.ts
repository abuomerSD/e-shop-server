import { http } from "../http";
import type { IBrand, IBrandCreate, IApiResponse } from "../../types/types";

export const brandService = {
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
    const url = `/brands${queryString ? `?${queryString}` : ""}`;

    return await http.get<IBrand[]>(url);
  },

  getById: async (id: string): Promise<IApiResponse<IBrand>> => {
    return await http.get<IBrand>(`/brands/${id}`);
  },

  create: async (data: IBrandCreate): Promise<IApiResponse<IBrand>> => {
    return await http.post<IBrand>("/brands", data);
  },

  update: async (
    id: string,
    data: Partial<IBrandCreate>
  ): Promise<IApiResponse<IBrand>> => {
    return await http.put<IBrand>(`/brands/${id}`, data);
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
