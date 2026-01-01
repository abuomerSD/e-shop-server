import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/api";
import type { IUser } from "../types/types";
import { authUtils } from "../services/http";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app start
    const currentUser = authService.getCurrentUser();
    const isAuth = authService.isAuthenticated();

    if (isAuth && currentUser) {
      setUser(currentUser);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });

    console.log("login response:", response);

    // Store token and user data
    if (response.data) {
      authUtils.setToken(response.token);
      authUtils.setUser(response.data);
    }

    const user = response.data;
    setUser(user);
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phone?: string;
  }) => {
    const response = await authService.signup(userData);

    console.log("Signup response:", response);

    // Store token and user data
    if (response.data) {
      authUtils.setToken(response.token);
      authUtils.setUser(response.data);
    }

    setUser(response.data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user && authService.isAuthenticated(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
