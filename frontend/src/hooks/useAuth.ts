import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
export const useAuth = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  // const logout = useUserStore((state) => state.logout);

  const [loading, _setLoading] = useState(true);
  const [error, _setError] = useState(false);
  const navigate = useNavigate();

  const login = (datosUsuario: {
    id: string;
    nombre: string;
    email: string;
  }) => {
    // Acá va la lógica para llamar a la API de login (en el mismo se usa setError y setLoading)
    setUser(datosUsuario);
    navigate("/");
  };

  const register = (datosUsuario: {
    id: string;
    nombre: string;
    email: string;
  }) => {
    // Acá va la lógica para llamar a la API de registro (en el mismo se usa setError y setLoading)
    setUser(datosUsuario);
    navigate("/");
  };

  const handleLogout = () => {
    //logout();
    navigate("/login");
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout: handleLogout,
    error,
    loading,
  };
};