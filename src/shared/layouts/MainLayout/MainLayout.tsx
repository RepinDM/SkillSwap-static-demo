// Добавлен Layout для отображения Header/Footer для разного контента

import { Header } from "@/widgets/header/header";
import { Footer } from "@/widgets/Footer/Footer";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";



export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}><Outlet /></main>
      <Footer />
    </div>
  );
};
