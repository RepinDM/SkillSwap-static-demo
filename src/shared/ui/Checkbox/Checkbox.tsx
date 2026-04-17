import {
  forwardRef,
  useId,
  useLayoutEffect,
  useRef,
  type InputHTMLAttributes,
  type Ref,
} from "react";

import checkboxDone from "@/shared/image/icons/checkbox-done.svg";
import checkboxEmpty from "@/shared/image/icons/checkbox-empty.svg";
import checkboxRemove from "@/shared/image/icons/checkbox-remove.svg";

import styles from "./Checkbox.module.scss";

function assignRef<T>(instanceRef: Ref<T> | undefined, value: T | null) {
  if (typeof instanceRef === "function") {
    instanceRef(value);
  } else if (instanceRef && typeof instanceRef === "object" && "current" in instanceRef) {
    (instanceRef as React.MutableRefObject<T | null>).current = value;
  }
}

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> & {
  label: string;
  error?: string;
  hint?: string;
  indeterminate?: boolean;
};


export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const innerRef = useRef<HTMLInputElement>(null);

    const mergedRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      assignRef(ref, node);
    };

    const isChecked = Boolean(checked);

    useLayoutEffect(() => {
      const el = innerRef.current;
      if (el) {
        el.indeterminate = indeterminate && !isChecked;
      }
    }, [indeterminate, isChecked]);

    const showRemove = indeterminate && !isChecked;
    const iconSrc = showRemove ? checkboxRemove : checked ? checkboxDone : checkboxEmpty;
    return (
      <div className={styles.root}>
        <input
          id={id}
          ref={mergedRef}
          type="checkbox"
          className={styles.native}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          aria-checked={showRemove ? "mixed" : checked ? true : false}
          {...props}
        />
        <label htmlFor={id} className={className ? `${styles.label} ${className}` : styles.label}>
          <span className={styles.icon} aria-hidden>
            <img src={iconSrc} alt="" width={20} height={20} />
          </span>
          <span className={styles.text}>{label}</span>
        </label>
        {error && <span className={styles.errorText}>{error}</span>}
        {!error && hint && <span className={styles.hintText}>{hint}</span>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";