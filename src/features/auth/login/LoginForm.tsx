import { useState, useRef } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./LoginForm.module.scss";
import IconGoogle from "@/shared/image/icons/Google.svg";
import IconApple from "@/shared/image/icons/Apple.svg";
import EyeOpen from "@/shared/image/icons/eye.svg";
import EyeClosed from "@/shared/image/icons/eye-slash.svg";
import LightBulb from "@/shared/image/light/light-bulb.png";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { selectAuthError, selectAuthIsLoading } from "@/services/slices/authSlice";
import { loginUser } from "@/services/actions/login";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = useAppSelector(selectAuthIsLoading);
  const error = useAppSelector(selectAuthError);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const handleVisible = () => {
    setIsPasswordVisible((v) => !v);
    passRef.current?.focus();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className={styles.content}>
      <section className={styles.auth_section}>
        <div className={styles.auth_providers}>
          <Button variant="secondary" iconLeft={<img src={IconGoogle} alt="Google" />}>
            Продолжить с Google
          </Button>
          <Button variant="secondary" iconLeft={<img src={IconApple} alt="Apple" />}>
            Продолжить с Apple
          </Button>
        </div>

        <div className={styles.divider}>
          <span>или</span>
        </div>

        <form className={styles.auth_form} onSubmit={handleLogin}>
          <Input
            name="email"
            placeholder="Введите email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className={styles.container}>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Пароль"
              placeholder="Введите ваш пароль"
              ref={passRef}
              required
            />
            <button
              type="button"
              className={clsx(styles.eyeButton)}
              onClick={handleVisible}
            >
              <img src={isPasswordVisible ? EyeOpen : EyeClosed} alt="" />
            </button>
          </div>

          {error && (
            <p className={styles.error}>{error}</p>
          )}

          <div className={styles.submit_button}>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Входим..." : "Войти"}
            </Button>
          </div>
        </form>

        <p className={styles.register}>
          <Link className={styles.register_link} to="/register">
            Зарегистрироваться
          </Link>
        </p>
      </section>

      <section className={styles.text_group}>
        <img src={LightBulb} alt="" />
        <h2>С возвращением в SkillSwap!</h2>
        <span>Обменивайтесь знаниями и навыками с другими людьми</span>
      </section>
    </div>
  );
};