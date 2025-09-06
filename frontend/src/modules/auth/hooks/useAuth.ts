import { useUserStore } from "@/modules/auth/stores/useUserStore";
import { useFetchApi } from "@/modules/core/hooks/useFetchApi";
import { useNavigate } from "react-router-dom";
import type { RegisterFormData } from "../types/register.type";
import type { ApiResponse, Credentials } from "../types/auth";
import { useCallback, useEffect } from "react";

export const useAuth = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const logoutStore = useUserStore((state) => state.logout);

  const { request, loading, error } = useFetchApi<ApiResponse>();
  
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    logoutStore();
    navigate("/login");
  }, [logoutStore, navigate]); 

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      // const user = localStorage.getItem("user"); 

      if (token) {
        setUser({email:"",id:1,image:"",name:"",password:""});
      }
    };

    checkToken();
  }, [request, setUser, logout]); 

  const login = async (credentials: Credentials) => {
    try {
      const data = await request("http://localhost:3000/auth/login", {
        method: "POST",
        body: credentials,
      });
      console.log(data);

      localStorage.setItem("token", data.value.token);
      localStorage.setItem("user", JSON.stringify(data.value.user))

      setUser(data.value.user);
      console.error("Register error:", error);

      navigate("/");
    } catch (err) {
      console.error("Login error:", error);
      throw err;
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
          image: "https://example.com/avatar.jpg",
        },
      });
      console.log(data);
      localStorage.setItem("token", data.value.token);
      localStorage.setItem("user", JSON.stringify(data.value.user))
      setUser(data.value.user);

      navigate("/");
    } catch (err) {
      console.error("Register error:", error);
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
