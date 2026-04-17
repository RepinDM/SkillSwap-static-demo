import { useAppSelector } from "@/services/hooks";
import { selectIsAuthenticated } from "@/services/slices/authSlice";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};