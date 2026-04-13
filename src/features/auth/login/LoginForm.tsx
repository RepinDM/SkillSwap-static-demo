import { useState, useRef } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./LoginForm.module.scss";
import IconGoogle from "@/shared/image/icons/Google.svg";
import IconApple from "@/shared/image/icons/Apple.svg";
import EyeOpen from '@/shared/image/icons/eye.svg';
import EyeClosed from '@/shared/image/icons/eye-slash.svg';
import LightBulb from '@/shared/image/light/light-bulb.png';


export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    const passRef = useRef<HTMLInputElement>(null);

    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleVisible = () => {
        setIsPasswordVisible((v) => !v);
        passRef.current?.focus();   
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // вместо fetch - фейковый ответ
            const fakeResponse = {
                accessToken: "fake-access-token-123",
                refreshToken: "fake-refresh-token-123",
                user: {
                    id: 1,
                    email,
                    name: "Test User",
                },
            };

            // имитация задержки сервера
            await new Promise((res) => setTimeout(res, 500));

            localStorage.setItem("accessToken", fakeResponse.accessToken);
            localStorage.setItem("refreshToken", fakeResponse.refreshToken);
            localStorage.setItem("user", JSON.stringify(fakeResponse.user));

            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
        }
    };

    // const handleLogin = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch("http://skillswap.ovnet.ru/api/login/", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 password,
    //             }),
    //         });

    //         const data = await response.json();

    //         if (!response.ok) {
    //             throw new Error(data.error || "Login failed");
    //         }

    //         // СОХРАНЯЕМ ТОКЕН
    //         localStorage.setItem("accessToken", data.accessToken);
    //         localStorage.setItem("refreshToken", data.refreshToken);

    //         // (опционально)
    //         localStorage.setItem("user", JSON.stringify(data.user));

    //         // редирект
    //         navigate(from, { replace: true });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <div className={styles.content}>
            <section className={styles.auth_section}>
                <div className={styles.auth_providers}>
                    <Button
                        variant="secondary"
                        iconLeft={<img src={IconGoogle} alt="Google" />}
                    >
                        Продолжить с Google

                    </Button>

                    <Button
                        variant="secondary"
                        iconLeft={<img src={IconApple} alt="Apple" />}
                    >
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
                        onChange={emailChangeHandler}
                        required
                    />

                    <div className={styles.container}>
                        <Input
                            type={isPasswordVisible ? "text" : "password"}
                            value={password}
                            onChange={passwordChangeHandler}
                            label="Пароль"
                            error={error}
                            placeholder={"Введите ваш пароль"}
                            ref={passRef}
                            required
                        />

                        <button
                            type="button"
                            className={clsx(styles.eyeButton)}
                            onClick={handleVisible}
                        >
                            {isPasswordVisible ? (
                                    <img src={EyeOpen} alt="EyeOpen" />
                                ) : (
                                    <img src={EyeClosed} alt="EyeClosed" />
                                )
                            }

                        </button>
                    </div>

                    <div className={styles.submit_button}>
                        <Button type="submit">
                            Войти
                        </Button>
                    </div>
                </form>

                <p className={styles.register}>
                    <Link className={styles.register_link} to="/register">Зарегистрироваться</Link>
                </p>
            </section>

            <section className={styles.text_group}>
                <img src={LightBulb} alt=""/>
                <h2>С возвращением в SkillSwap!</h2>
                <span>Обменивайтесь знаниями и навыками с другими людьми</span>
            </section>
        </div>
    );
};
