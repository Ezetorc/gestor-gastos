import { Navigate } from "react-router-dom";
import { useUserStore } from "@/modules/auth/stores/useUserStore";

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  console.log("user guetroute", user);
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
