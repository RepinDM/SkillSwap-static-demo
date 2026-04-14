import { useAppDispatch } from "@/services/hooks";
import { logout } from "@/services/slices/authSlice";
import { useNavigate } from "react-router-dom";
import logoutIcon from "@/shared/image/icons/logout.svg";
import styles from "./LogoutButton.module.scss";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button type="button" onClick={handleLogout} className={styles.button}>
      <img src={logoutIcon} alt="" className={styles.icon} aria-hidden="true" />
      Выйти
    </button>
  );
};

export default LogoutButton;
