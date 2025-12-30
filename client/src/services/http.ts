import axios from "axios";
import { API_URL } from "../config/env";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

export const http = {
  get: async (url: string) => {
    const res = await axiosInstance.get(url);
    return res.data;
  },
  post: async (url: string, data: object) => {
    const res = await axiosInstance.post(url, data);
    return res.data;
  },
  put: async (url: string, id: string, data: object) => {
    const res = await axiosInstance.put(`${url}/${id}`, data);
    return res.data;
  },
  delete: async (url: string, id: object) => {
    const res = await axiosInstance.delete(`${url}/${id}`);
    return res.data;
  },
  //   upload: async (url: string, file: File, extraData: object = {}) => {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     Object.keys(extraData).forEach((key) => {
  //       formData.append(key, extraData[key]);
  //     });

  //     const res = await axiosInstance.post(url, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       maxContentLength: 100 * 1024 * 1024, // limit 100MB
  //     });

  //     return res.data;
  //   },
};
