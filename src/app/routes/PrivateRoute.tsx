import { useAppSelector } from "@/services/hooks";
import { selectIsAuthenticated } from "@/services/slices/authSlice";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};