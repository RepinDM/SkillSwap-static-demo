import type { CSSProperties } from "react";
import styles from "./Loader.module.scss";

type LoaderProps = {
  className?: string;
  label?: string;
  fullscreen?: boolean;
};

export const Loader = ({
  className = "",
  label = "Загрузка",
  fullscreen = true,
}: LoaderProps) => {
  const rootClassName = [
    styles.loader,
    fullscreen ? styles.fullscreen : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fullscreenStyle = fullscreen
    ? ({
        flex: "1 1 0%",
        minHeight: 0,
        width: "100%",
        alignSelf: "stretch" as const,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      } satisfies CSSProperties)
    : undefined;

  return (
    <div
      className={rootClassName}
      style={fullscreenStyle}
      aria-live="polite"
      aria-label={label}
    >
      <span className={styles.spinner} aria-hidden="true" />
    </div>
  );
};
