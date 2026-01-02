import { http } from "../http";
import type { IUser, IUserCreate, IApiResponse } from "../../types/types";

export const userService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    searchCol?: string;
    role?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.search) searchParams.append("search", params.search);
    if (params?.searchCol) searchParams.append("searchCol", params.searchCol);
    if (params?.role) searchParams.append("role", params.role);

    const queryString = searchParams.toString();
    const url = `/users${queryString ? `?${queryString}` : ""}`;

    return await http.get<IUser[]>(url);
  },

  getById: async (id: string): Promise<IApiResponse<IUser>> => {
    return await http.get<IUser>(`/users/${id}`);
  },

  create: async (data: IUserCreate): Promise<IApiResponse<IUser>> => {
    return await http.post<IUser>("/users", data);
  },

  update: async (
    id: string,
    data: Partial<IUserCreate>
  ): Promise<IApiResponse<IUser>> => {
    return await http.put<IUser>(`/users/${id}`, data);
  },

  delete: async (id: string): Promise<IApiResponse<void>> => {
    return await http.delete<void>(`/users/${id}`);
  },

  uploadProfileImage: async (
    id: string,
    formData: FormData
  ): Promise<IApiResponse<IUser>> => {
    return await http.upload<IUser>(`/users/${id}/profileImage`, formData);
  },
};
