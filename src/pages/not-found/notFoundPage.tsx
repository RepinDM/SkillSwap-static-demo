import { useNavigate } from "react-router-dom";
import styles from "./notFoundPage.module.scss";
import notFoundImage from "../../shared/image/webp/404.webp";
import { Button } from "../../shared/ui/Button/Button";

export const NotFoundPage = () => {
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
        src={notFoundImage}
        alt="404 - Страница не найдена"
        className={styles.image}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>Страница не найдена</h2>
        <p className={styles.description}>
          К сожалению, эта страница недоступна. Вернитесь на главную страницу
          или попробуйте позже
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
