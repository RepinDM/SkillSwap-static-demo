import { NavLink } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <>
      <NavLink to="requests">Заявки</NavLink>
      <NavLink to="exchanges">Мои обмены</NavLink>
      <NavLink to="favorites">Избранное</NavLink>
      <NavLink to="skills">Мои навыки</NavLink>
      <NavLink to="/profile">Личные данные</NavLink>
    </>
  );
};

export default ProfileSidebar;