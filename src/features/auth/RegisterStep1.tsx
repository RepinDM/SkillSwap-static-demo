import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterStep1.module.scss";
import clsx from "clsx";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/input";
import eyeOpen from "@/shared/image/icons/eye.svg";
import eyeClosed from "@/shared/image/icons/eye-slash.svg";
import iconGoogle from "@/shared/image/icons/Google.svg";
import iconApple from "@/shared/image/icons/Apple.svg";
import lightBulb from "@/shared/image/webp/light-bulb.webp";

const registerStep1Schema = yup.object({
  email: yup
    .string()
    .required("Email обязателен")
    .email("Введите корректный email")
    .max(254, "Email слишком длинный"),

  password: yup
    .string()
    .required("Пароль обязателен")
    .min(8, "Пароль должен содержать не менее 8 знаков")
    .max(64, "Пароль должен содержать не более 64 знаков")
    .matches(/[A-Z]/, "Должна быть заглавная буква")
    .matches(/[a-z]/, "Должна быть строчная буква")
    .matches(/[0-9]/, "Должна быть цифра"),
});

type RegisterStep1Values = yup.InferType<typeof registerStep1Schema>;

export const RegisterStep1 = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegisterStep1Values>({
    resolver: yupResolver(registerStep1Schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleVisible = () => {
    setIsPasswordVisible((v) => !v);
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      const data = getValues();
      navigate("/register/step-2", { state: data });
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.form}>
        <div className={styles.inputForm}>
          <div className={styles.login}>
            <Button
              variant="secondary"
              iconLeft={<img src={iconGoogle} alt="Google" />}
            >
              Продолжить с Google
            </Button>
            <Button
              variant="secondary"
              iconLeft={<img src={iconApple} alt="Apple" />}
            >
              Продолжить с Apple
            </Button>
          </div>
          <div className={styles.divider}>
            <span>или</span>
          </div>
          <div>
            <Input
              type="email"
              label="Email"
              placeholder="Введите email"
              error={errors.email?.message}
              {...register("email")}
            />
            <div className={styles.passwordWrapper}>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                label="Пароль"
                placeholder="Придумайте надежный пароль"
                error={errors.password?.message}
                {...register("password")}
              />
              <button
                type="button"
                className={clsx(styles.eyeButton)}
                onClick={handleVisible}
              >
                <img
                  src={isPasswordVisible ? eyeOpen : eyeClosed}
                  alt=""
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>
        <Button disabled={!isValid} onClick={handleNext}>
          Далее
        </Button>
      </section>
      <section className={styles.info}>
        <img src={lightBulb} />
        <div className={styles.layout}>
          <span className={styles.text}>Добро пожаловать в SkillSwap!</span>
          <span className={styles.textDetails}>
            Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с
            другими людьми
          </span>
        </div>
      </section>
    </main>
  );
};
