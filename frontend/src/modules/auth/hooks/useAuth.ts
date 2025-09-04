import { useUserStore } from "@/modules/auth/stores/useUserStore";
import { useFetchApi } from "@/modules/core/hooks/useFetchApi";
import { useNavigate } from "react-router-dom";
import type { RegisterFormData } from "../types/register.type";
import { useCallback, useEffect } from "react";
import type { UserT } from "../types/user";

type Credentials = {
  email: string;
  password: string;
};

type ApiResponse = {
  value: {
    token: string;
    user: UserT;
  };
};

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
      if (token) {
        setUser({email:"asd",id:2,image:"asd",name:"asda",password:"sda"});
        /*
        try {
          const data = await request("http://localhost:3000/auth/validate", {
            method: "GET",
            token: token, // Envía el token en los headers
          });

          setUser(data.user);
        } catch (err) {
          logout();
        }
        */
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
      setUser(data.value.user);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
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
      setUser(data.value.user);

      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
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
