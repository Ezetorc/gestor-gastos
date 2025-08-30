import { Navigate } from "react-router-dom";
import { useUserStore } from "@/modules/auth/stores/useUserStore";

export function RouteProtected({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
