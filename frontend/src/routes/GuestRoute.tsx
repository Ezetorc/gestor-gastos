import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  console.log("user guetroute", user);
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
