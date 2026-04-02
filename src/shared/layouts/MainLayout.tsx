// Добавлен Layout с возможностью отключения отображения Header/Footer

import { Header } from '@/widgets/header/Header';
import { Footer } from "@/widgets/Footer/Footer";
import styles from "./MainLayout.scss";
import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const Layout = ({ 
  children, 
  showHeader = true, 
  showFooter = true 
}: LayoutProps) => {
  return (
    <div className={styles.layout}>
      {showHeader && <Header />}
      <main className={styles.main}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};
