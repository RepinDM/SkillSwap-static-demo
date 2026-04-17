import styles from "@/features/auth/RegisterStep2.module.scss";

type StepProgressProps = {
  step: number;
  totalSteps: number;
};

export const StepProgress = ({ step, totalSteps }: StepProgressProps) => {
  return (
    <div className={styles.stepsBlock}>
      <h2 className={styles.stepsTitle}>
        Шаг {step} из {totalSteps}
      </h2>
      <div className={styles.progressBar}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={
              index < step ? styles.progressStepActive : styles.progressStepInactive
            }
          />
        ))}
      </div>
    </div>
  );
};
