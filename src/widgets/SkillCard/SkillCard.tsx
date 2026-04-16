import type { TSkillCard } from "@/entities/skill/types";
import { Tag } from "@/shared/ui/Tag/Tag";
import { User } from "@/shared/ui/User/User";

import styles from "./SkillCard.module.scss";
import { Button } from "@/shared/ui/Button/Button";
import buttonLike from "@/shared/image/icons/like.svg";
import { Link } from "react-router-dom";
import { getAge } from "@/shared/lib/utils/getAge";
import { getCategoryColor } from "@/shared/lib/utils/getCategoryColors";

import buttonLikePainted from "@/shared/image/icons/like-painted-over.svg"
import { selectLikesById } from "@/services/slices/likesSlice";
import { useAppSelector, useAppDispatch } from "@/services/hooks";
import { toggleLike } from "@/services/slices/likesSlice";
import React from "react";
import { toggleFavorites } from "@/services/slices/favoritesSlice";

type Props = {
  card: TSkillCard;
  showFavoriteButton?: boolean;
};
export const SkillCard = React.memo(({ card, showFavoriteButton = true }: Props) => {

  const like = useAppSelector(state => selectLikesById(state, card.id));

  const isLiked = like?.isLiked ?? false;
  const count = like?.count ?? 0;

  const dispatch = useAppDispatch();
  const handleToggleLike = () => {
    dispatch(toggleLike(card.id));
    dispatch(toggleFavorites(card.id))
  }

  return (
    <>
       <li className={styles.card}>
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <User
                avatar={card.user.avatar}
                name={card.user.name}
                city={card.user.city.name}
                age={getAge(card.user.birthDate)}
                avatarSize={100}
              />
            </div>
          {showFavoriteButton && (
            <div className={styles.like_wrapper}>
              <span className={styles.like_count}>{count}</span>
              <button
                type="button"
                onClick={handleToggleLike}
                className={styles.like_button}
                aria-pressed={isLiked}
                aria-label={isLiked ? "Убрать лайк" : "Поставить лайк"}
              >
                <img
                  src={isLiked ? buttonLikePainted : buttonLike}
                  alt=""
                  className={styles.like_icon}
                />
              </button>
            </div>
          )}
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
          <Link to={`/skill/${card.id}`} className={styles.link}>
            <Button
              variant="primary"
              onClick={() => console.log("click", card)}
            >
              Подробнее
            </Button>
          </Link>
        </li>
    </>
  );
});
