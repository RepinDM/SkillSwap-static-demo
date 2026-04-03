import { Outlet } from "react-router-dom";
import { Logo } from "../../ui/Logo/Logo";
import styles from "./AuthMain.module.scss";

export const AuthMain = () => {
  return (
    <div className={styles.authLayout}>
      <header>
        <Logo/>
        <button>Закрыть</button>
      </header>
      <div></div>
      <main><Outlet/></main>
    </div>
  )
}