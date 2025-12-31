import { http, authUtils } from "../http";
import type {
  ILoginCredentials,
  ISignupData,
  IAuthResponse,
} from "../../types/types";

export const authService = {
  login: async (credentials: ILoginCredentials): Promise<IAuthResponse> => {
    const response = await http.post<IAuthResponse>("/auth/login", credentials);

    // Store token and user data
    if (response.data.token) {
      authUtils.setToken(response.data.token);
      authUtils.setUser(response.data.data);
    }

    return response.data;
  },

  signup: async (userData: ISignupData): Promise<IAuthResponse> => {
    const response = await http.post<IAuthResponse>("/auth/signup", userData);

    // Store token and user data
    if (response.data.token) {
      authUtils.setToken(response.data.token);
      authUtils.setUser(response.data.data);
    }

    return response.data;
  },

  logout: () => {
    authUtils.removeToken();
    // Redirect to login page
    window.location.href = "/login";
  },

  getCurrentUser: () => {
    return authUtils.getUser();
  },

  isAuthenticated: () => {
    return authUtils.isAuthenticated();
  },

  // Password reset functions
  requestPasswordReset: async (email: string) => {
    return await http.post("/users/requestPasswordResetCode", { email });
  },

  verifyResetCode: async (resetCode: string) => {
    return await http.post("/users/verifyPasswordResetCode", { resetCode });
  },

  changePassword: async (email: string, newPassword: string) => {
    return await http.post("/users/changePassword", { email, newPassword });
  },
};
