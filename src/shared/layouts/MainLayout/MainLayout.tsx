// Добавлен Layout для отображения Header/Footer для разного контента

import { Header } from "@/widgets/header/header";
import { Footer } from "@/widgets/Footer/Footer";
import styles from "./MainLayout.module.scss";
import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
