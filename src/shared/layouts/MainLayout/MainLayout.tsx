// Добавлен Layout для отображения Header/Footer для разного контента
import { Header } from "@/widgets/Header/Header";
import { Footer } from "@/widgets/Footer/Footer";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";



export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main
        className={styles.main}
        style={{
          flex: "1 1 0%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
