import { Header } from '@/widgets/header/Header';
import { Footer } from "@/widgets/Footer/Footer";
import styles from "./mainLayout.scss";
import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
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
