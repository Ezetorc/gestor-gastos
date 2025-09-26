import { useUserStore } from "@/modules/auth/stores/useUserStore";
import { useFetchApi } from "@/modules/core/hooks/useFetchApi";
import { useNavigate } from "react-router-dom";
import type { RegisterFormData } from "../types/register.type";
import type { ApiResponse, Credentials } from "../types/auth";
import { useCallback, useEffect } from "react";
import type { ApiError } from "@/modules/core/types/fetch";

export const useAuth = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const logoutStore = useUserStore((state) => state.logout);
  const { request, loading, error } = useFetchApi<ApiResponse>();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logoutStore();
    navigate("/login");
  }, [logoutStore, navigate]);

  const handleApiError = useCallback((err: unknown) => {
    const apiErr = err as ApiError;
    if (apiErr?.status === 401) {
      logout();
    }
    // console.error("API Error:", apiErr?.message || err);
  }, [logout]);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          logout();
        }
      }
    };

    checkToken();
  }, [setUser, logout]);

  const login = async (credentials: Credentials) => {
    try {
      const data = await request("http://localhost:3000/auth/login", {
        method: "POST",
        body: credentials,
      });

      localStorage.setItem("token", data.value.token);
      localStorage.setItem("user", JSON.stringify(data.value.user));
      setUser(data.value.user);

      navigate("/");
    } catch (err) {
      handleApiError(err);
    }
  };

  const register = async (formData: RegisterFormData) => {
    try {
      const data = await request("http://localhost:3000/auth/register", {
        method: "POST",
        body: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });

      localStorage.setItem("token", data.value.token);
      localStorage.setItem("user", JSON.stringify(data.value.user));
      setUser(data.value.user);

      navigate("/");
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
    error,
  };
};
