import { useState } from "react";
import { useAppSelector } from "@/services/hooks";
import {
  selectAllSkillCards,
  selectStatus,
} from "@/services/slices/skillCardsSlice";
import { selectUser } from "@/services/slices/authSlice";
import { Tag } from "@/shared/ui/Tag/Tag";
import { Button } from "@/shared/ui/Button/Button";
import { getCategoryColor } from "@/shared/lib/utils/getCategoryColors";

import styles from "./SkillsSection.module.scss";
import { EditTeachSkillModal } from "@/features/ProfileSkillModal/EditTeachSkillModal";
import { EditLearnSkillsModal } from "@/features/ProfileSkillModal/EditLearnSkillsModal";

const SkillsSection = () => {
  const currentUser = useAppSelector(selectUser);
  const allCards = useAppSelector(selectAllSkillCards);
  const status = useAppSelector(selectStatus);

  const [showTeachModal, setShowTeachModal] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);

  const isLoading = status === "loading";

  const myCard = allCards.find((c) => c.user.id === currentUser?.id);

  if (isLoading) return <p>Loading...</p>;

  const teachSkill = myCard?.teachSkill;
  const learnSkills = myCard?.learnSkills || [];
  const images = teachSkill?.images || [];

  return (
    <div className={styles.section}>

      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <h2 className={styles.blockTitle}>Могу научить</h2>

          <Button
            variant="secondary"
            onClick={() => setShowTeachModal(true)}
            className={styles.editButton}
          >
            Редактировать
          </Button>
        </div>

        {teachSkill && (
          <div className={styles.teachCard}>
            <div className={styles.teachInfo}>
              <Tag
                label={teachSkill.subcategory.category.name}
                bgColor={getCategoryColor(
                  teachSkill.subcategory.category.slug
                )}
              />
              <h3 className={styles.teachTitle}>{teachSkill.title}</h3>
              <p className={styles.teachDescription}>
                {teachSkill.description}
              </p>
            </div>

            {images.length > 0 && (
              <div className={styles.teachImages}>
                {images.slice(0, 3).map((img, index) => (
                  <div key={index} className={styles.imageWrapper}>
                    <img
                      src={img}
                      alt={`${teachSkill.title}-${index}`}
                      className={styles.teachImage}
                    />

                    {index === 2 && images.length > 3 && (
                      <div className={styles.teachImageCount}>
                        +{images.length - 3}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Хочу научиться ── */}
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <h2 className={styles.blockTitle}>Хочу научиться</h2>

          <Button
            variant="secondary"
            onClick={() => setShowLearnModal(true)}
            className={styles.editButton}
          >
            Редактировать список
          </Button>
        </div>

        {learnSkills.length === 0 ? (
          <p className={styles.emptyLearn}>Навыки не добавлены</p>
        ) : (
          <ul className={styles.learnList}>
            {learnSkills.map((skill) => (
              <li key={skill.id} className={styles.learnItem}>
                <Tag
                  label={skill.subcategory.category.name}
                  bgColor={getCategoryColor(
                    skill.subcategory.category.slug
                  )}
                />
                <span className={styles.learnSkillName}>
                  {skill.subcategory.name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <EditTeachSkillModal
        isOpen={showTeachModal}
        onClose={() => setShowTeachModal(false)}
        currentLearnSkills={learnSkills.map((s) => ({
          subcategoryId: String(s.subcategory.id),
        }))}
        initialData={{
          title: teachSkill?.title || "",
          description: teachSkill?.description || "",
          categoryId: String(teachSkill?.subcategory?.category?.id || ""),
          subcategoryId: String(teachSkill?.subcategory?.id || ""),
          imageUrls: images,
        }}
      />

      <EditLearnSkillsModal
        isOpen={showLearnModal}
        onClose={() => setShowLearnModal(false)}
        currentTeachSkill={{
          title: teachSkill?.title || "",
          description: teachSkill?.description || "",
          subcategoryId: String(teachSkill?.subcategory?.id || ""),
          imageUrls: images,
        }}
        initialData={learnSkills.map((s) => ({
          categoryId: String(s.subcategory.category.id),
          subcategoryId: String(s.subcategory.id),
        }))}
      />
    </div>
  );
};

export default SkillsSection;