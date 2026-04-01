//Сверстала страницу ServerErrorPage, добавила стили, добавила логику перехода на главную и сообщение заглушку на ошибку

import { useNavigate } from "react-router-dom";
import styles from "./serverErrorPage.module.scss";
import errorImage from "../../shared/image/webp/500.webp";
import { Button } from "../../shared/ui/Button/Button";

export const ServerErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleReportError = () => {
    alert("Спасибо за сообщение! Мы исправим ошибку в ближайшее время.");
  };

  return (
    <div className={styles.container}>
      <img
        src={errorImage}
        alt="500 - На сервере произошла ошибка"
        className={styles.image}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>На сервере произошла ошибка</h2>
        <p className={styles.description}>
          Попробуйте позже или вернитесь на главную страницу
        </p>
      </div>
      <div className={styles.buttons}>
        <Button onClick={handleReportError} variant="secondary">
          Сообщить об ошибке
        </Button>
        <Button onClick={handleGoHome} variant="primary">
          На главную
        </Button>
      </div>
    </div>
  );
};
