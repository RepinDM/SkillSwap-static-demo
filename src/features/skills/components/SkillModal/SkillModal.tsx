import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button/Button";
import type { TSkill } from "@/entities/skill/types";
import styles from "./SkillModal.module.scss";

interface SkillModalProps {
  isOpen: boolean;
  teachSkill: TSkill;
}

export const SkillModal: FC<SkillModalProps> = ({
  isOpen,
  teachSkill,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDone = () => {
    navigate("/");
  };

  const mainImage = teachSkill.images?.[0];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.header}>Ваше предложение</h2>
        <p className={styles.subHeader}>
          Пожалуйста, проверьте и подтвердите правильность данных
        </p>

        <div className={styles.content}>
          <div className={styles.info}>
             <div className={styles.textBlock}>
                <div className={styles.textBlockTitle}>
                    <h3 className={styles.title}>{teachSkill.title}</h3>
                    <p className={styles.category}>
                        {teachSkill.subcategory.category.name} /{" "}
                        {teachSkill.subcategory.name}
                    </p>
                </div>
                <p className={styles.description}>
                    {teachSkill.description}
                </p>
             </div>
             <div className={styles.actions}>
              <Button variant="secondary" 
                    iconRight={<img src="/edit.svg" alt="edit"/>}>
                Редактировать
              </Button>

              <Button onClick={handleDone}>
                Готово
              </Button>
             </div>
          </div>

          <div className={styles.gallery}>
            <img
            src={mainImage || "https://via.placeholder.com/324"}
            className={styles.mainImage}
            alt="main"
            />
            <div className={styles.previewColumn}>
                {teachSkill.images?.slice(1, 4).map((img, i) => (
                    <img
                    key={i}
                    src={img}
                    className={styles.preview}
                    alt="preview"
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};