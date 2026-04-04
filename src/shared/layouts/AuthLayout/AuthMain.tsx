import React from "react";
import { Logo } from "../../ui/Logo/Logo";
import styles from "./AuthMain.module.scss";
import closeButton from "@/shared/image/icons/cross.svg";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

export interface LayoutProps {
  children: React.ReactNode;
}

export const AuthMain = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    navigate("/");
  };

  const getCurrentStep = () => {
    if (location.pathname.includes("/step-2")) return 2;
    if (location.pathname.includes("/step-3")) return 3;
    return 1;
  };

  const currentStep = getCurrentStep();
  const totalSteps = 3;

  return (
    <div className={styles.authLayout}>
      <header className={styles.header}>
        <Logo />
        <button
          className={styles.btnClose}
          onClick={handleClose}
          aria-label="Закрыть"
          type="button"
        >
          Закрыть
          <img src={closeButton} className={styles.imgBtn} />
        </button>
      </header>

      <div className={styles.progressContainer}>
        <div className={styles.progressLabel}>
          Шаг {currentStep} из {totalSteps}
        </div>
        <div className={styles.progressBars}>
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;

            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;
            return (
              <div key={index} className={styles.barWrapper}>
                <div className={styles.barTrack}>
                  <div
                    className={clsx(styles.barFill, {
                      [styles.barCompleted]: isCompleted,
                      [styles.barActive]: isActive,
                    })}
                    style={{ width: isActive || isCompleted ? "100%" : "0%" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
