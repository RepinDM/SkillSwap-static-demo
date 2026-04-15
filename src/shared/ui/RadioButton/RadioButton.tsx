import clsx from "clsx";
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type Ref,
} from "react";

import radioActive from "@/shared/image/icons/radiobutton-active.svg";
import radioEmpty from "@/shared/image/icons/radiobutton-empty.svg";

import styles from "./RadioButton.module.scss";

function assignRef<T>(instanceRef: Ref<T> | undefined, value: T | null) {
  if (typeof instanceRef === "function") {
    instanceRef(value);
  } else if (instanceRef && typeof instanceRef === "object" && "current" in instanceRef) {
    (instanceRef as React.MutableRefObject<T | null>).current = value;
  }
}

export type RadioButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> & {
  label: string;
  error?: string;
  hint?: string;
};

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      label,
      error,
      hint,
      disabled,
      className,
      id: idProp,
      onChange,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const mergedRef = (node: HTMLInputElement | null) => {
      assignRef(ref, node);
    };

    const iconSrc = checked ? radioActive : radioEmpty;

    return (
      <div className={styles.root}>
        <input
          id={id}
          ref={mergedRef}
          type="radio"
          className={styles.native}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <label htmlFor={id} className={clsx(styles.label, className)}>
          <span className={styles.icon} aria-hidden>
            <img src={iconSrc} alt="" width={24} height={24} />
          </span>
          <span className={styles.text}>{label}</span>
        </label>
        {error && <span className={styles.errorText}>{error}</span>}
        {!error && hint && <span className={styles.hintText}>{hint}</span>}
      </div>
    );
  }
);

RadioButton.displayName = "RadioButton";
