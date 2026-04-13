import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();

  return token ? (
    <>{children}</>
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }}
    />
  );
};