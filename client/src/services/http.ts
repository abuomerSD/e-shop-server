import axios from "axios";
import { API_URL } from "../config/env";
import type { IApiResponse } from "../types/types";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const http = {
  get: async <T = any>(url: string): Promise<IApiResponse<T>> => {
    const res = await axiosInstance.get(url);
    return res.data;
  },

  post: async <T = any>(
    url: string,
    data: object
  ): Promise<IApiResponse<T>> => {
    const res = await axiosInstance.post(url, data);
    return res.data;
  },

  put: async <T = any>(url: string, data: object): Promise<IApiResponse<T>> => {
    const res = await axiosInstance.put(url, data);
    return res.data;
  },

  patch: async <T = any>(
    url: string,
    data: object
  ): Promise<IApiResponse<T>> => {
    const res = await axiosInstance.patch(url, data);
    return res.data;
  },

  delete: async <T = any>(url: string): Promise<IApiResponse<T>> => {
    const res = await axiosInstance.delete(url);
    return res.data;
  },

  upload: async <T = any>(
    url: string,
    formData: FormData
  ): Promise<IApiResponse<T>> => {
    const res = await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  uploadPut: async <T = any>(
    url: string,
    formData: FormData
  ): Promise<IApiResponse<T>> => {
    const res = await axiosInstance.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};

// Auth helper functions
export const authUtils = {
  setToken: (token: string) => {
    localStorage.setItem("authToken", token);
  },

  getToken: (): string | null => {
    return localStorage.getItem("authToken");
  },

  removeToken: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  setUser: (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("authToken");
  },
};
