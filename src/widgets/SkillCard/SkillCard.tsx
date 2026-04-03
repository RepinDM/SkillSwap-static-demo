import { getAge, getCategoryColor } from "@/api/skillswap-api";
import type { TSkillCard } from "@/entities/skill/types";
import { Tag } from "@/shared/ui/Tag/Tag";
import { User } from "@/shared/ui/User/User";

import styles from "./SkillCard.module.scss";
import { Button } from "@/shared/ui/Button/Button";
import buttonLike from "@/shared/image/icons/like.svg";

type Props = {
  card: TSkillCard;
};

export const SkillCard = ({ card }: Props) => {
  return (
    <>
       <li className={styles.card} key={card.teachSkill.id}>
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <User
                name={card.user.name}
                avatar={card.user.avatar}
                city={card.user.city.name}
                age={getAge(card.user.birthDate)}
                avatarSize={100}
              />
            </div>
            <img src={buttonLike} alt="Кнопка добавления в избранное" />
          </div>

          {/* 2. Чему пользователь УЧИТ (teachSkill) */}
          <div className={styles.section}>
            <h4 className={styles.title}>Может научить:</h4>
            <Tag
              label={card.teachSkill.title}
              bgColor={getCategoryColor(
                card.teachSkill.subcategory.category.slug
              )}
            />
          </div>

          {/* 3. Чему пользователь хочет научиться (learnSkills - это массив) */}
          <div className={styles.section}>
            <h4 className={styles.title}>Хочет научиться:</h4>

            <ul className={styles.tags}>
              {card.learnSkills.slice(0, 2).map(skill => (
                <li key={skill.id}>
                  <Tag
                    label={skill.subcategory.name}
                    bgColor={getCategoryColor(
                      skill.subcategory.category.slug
                    )}
                  />
                </li>
              ))}

              {card.learnSkills.length > 2 && (
                <li className={styles.more}>
                  +{card.learnSkills.length - 2}
                </li>
              )}
            </ul>
          </div>

          <Button
            variant="primary"
            onClick={() => console.log("click", card)}
          >
            Подробнее
          </Button>
        </li>
    </>
  );
};