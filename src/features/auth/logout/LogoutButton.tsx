import { useAppDispatch } from "@/services/hooks";
import { logout } from "@/services/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button onClick={handleLogout}>
      Выйти
    </button>
  );
};

export default LogoutButton;