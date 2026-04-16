import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { SkillCard } from "@/widgets/SkillCard/SkillCard";
import { UserSkillPage } from "./UserSkillPage";
import buttonLike from "@/shared/image/icons/like.svg";
import buttonLikePainted from "@/shared/image/icons/like-painted-over.svg";
import shareIcon from "@/shared/image/icons/share.svg";
import moreIcon from "@/shared/image/icons/more-square.svg";
import chevronRightIcon from "@/shared/image/icons/chevron-right.svg";
import { getAge } from "@/shared/lib/utils/getAge";
import { selectAllSkillCards } from "@/services/slices/skillCardsSlice";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./SkillPage.module.scss";
import clsx from "clsx";
import { selectIsAuthenticated } from "@/services/slices/authSlice";
import { ExchangeSuggestedModal } from "@/features/ExchangeSuggestedModal/ExchangeSuggestedModal";
import { selectFavorites, toggleFavorites } from "@/services/slices/favoritesSlice";
import { toggleLike } from "@/services/slices/likesSlice";

export const SkillPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const allCards = useAppSelector(selectAllSkillCards);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const favorites = useAppSelector(selectFavorites);
  const navigate = useNavigate();
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const relatedSwiperRef = useRef<SwiperType | null>(null);

  const card = allCards.find((c) => c.id === Number(id));
  const related = allCards.filter(
    (c) =>
      c.id !== Number(id) &&
      c.teachSkill.subcategory.id === card?.teachSkill.subcategory.id
  );
  const displayImages = card?.teachSkill.images ?? [];
  const relatedCards = useMemo(() => related, [related]);
  const safeSelectedImageIndex = Math.min(
    selectedImageIndex,
    Math.max(displayImages.length - 1, 0)
  );

  if (!card) return <p>Навык не найден</p>;

  const { user, teachSkill, learnSkills } = card;
  const isFavorite = Boolean(favorites[card.id]);

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    mainSwiperRef.current?.slideTo(index);
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: { pathname: `/skill/${id}` } },
      });
      return;
    }

    dispatch(toggleLike(card.id));
    dispatch(toggleFavorites(card.id));
  };

  // Безопасное получение возраста
  const userAge = user.birthDate ? getAge(user.birthDate) : undefined;

  return (
    <main className={styles.page}>
      {/* Контейнер для двух колонок */}
      <div className={styles.twoColumnsContainer}>
        {/* Левая колонка — автор */}
        <UserSkillPage
          avatar={user.avatar}
          name={user.name}
          city={user.city?.name || ""}
          age={userAge}
          about={user.about}
          teachSkill={teachSkill}
          learnSkills={learnSkills}
        />

        <div className={styles.rightBlock}>
          <div className={styles.topActions}>
            <div className={styles.actionButtons}>
              <button
                className={clsx(styles.iconButton, {
                  [styles.iconButtonActive]: isFavorite,
                })}
                onClick={handleToggleFavorite}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                type="button"
              >
                <img
                  src={isFavorite ? buttonLikePainted : buttonLike}
                  alt="Избранное"
                />
              </button>
              <button className={styles.iconButton} type="button">
                <img src={shareIcon} alt="Поделиться" />
              </button>
              <button className={styles.iconButton} type="button">
                <img src={moreIcon} alt="Еще" />
              </button>
            </div>
          </div>

          {/* Контейнер для описания и галереи */}
          <div className={styles.contentWrapper}>
            <div className={styles.descriptionColumn}>
              <h1 className={styles.skillTitle}>{teachSkill.title}</h1>

              <p className={styles.breadcrumbs}>
                {teachSkill.subcategory.category?.name || ""} / {teachSkill.subcategory.name}
              </p>

              <p className={styles.description}>{teachSkill.description || "Описание навыка пока не добавлено."}</p>

              <button
                className={styles.exchangeButton}
                onClick={() => {
                  if (isAuthenticated) {
                    setIsExchangeOpen(true);
                  } else {
                    navigate("/login", {
                      state: { from: { pathname: `/skill/${id}` } },
                    });
                  }
                }}
              >
                Предложить обмен
              </button>
            </div>

            <div className={styles.galleryColumn}>
              {displayImages.length > 0 ? (
                <div className={styles.gallery}>
                  <div className={styles.mainImageContainer}>
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        nextEl: `.${styles.swiperNext}`,
                        prevEl: `.${styles.swiperPrev}`,
                      }}
                      onSwiper={(swiper) => {
                        mainSwiperRef.current = swiper;
                      }}
                      onSlideChange={(swiper) => setSelectedImageIndex(swiper.activeIndex)}
                      initialSlide={safeSelectedImageIndex}
                      className={styles.mainSwiper}
                      key={card.id}
                    >
                      {displayImages.map((img, i) => (
                        <SwiperSlide key={img || i}>
                          <img
                            src={img}
                            alt={`${teachSkill.title} - ${i + 1}`}
                            className={styles.mainImage}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    
                    <button
                      className={`${styles.swiperNav} ${styles.swiperPrev}`}
                      type="button"
                    >
                      <img src={chevronRightIcon} alt="Назад" className={styles.prevIcon} />
                    </button>
                    <button
                      className={`${styles.swiperNav} ${styles.swiperNext}`}
                      type="button"
                    >
                      <img src={chevronRightIcon} alt="Вперед" />
                    </button>
                  </div>

                  {/* Миниатюры - показываем только первые 3, на последней счетчик */}
                  {displayImages.length > 0 && (
                    <div className={styles.thumbnails}>
                      {displayImages.slice(0, 3).map((img, i) => {
                        const isLastThumbnail = i === 2 && displayImages.length > 3;
                        const remainingCount = displayImages.length - 3;
                        
                        return (
                          <button
                            key={i}
                            className={`${styles.thumbnail} ${safeSelectedImageIndex === i ? styles.activeThumbnail : ""}`}
                            onClick={() => handleImageSelect(i)}
                            type="button"
                          >
                            <img src={img} alt={`Миниатюра ${i + 1}`} />
                            {isLastThumbnail && remainingCount > 0 && (
                              <div className={styles.thumbnailOverlay}>
                                +{remainingCount}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.noImage}>Нет фото</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Похожие предложения */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <h2 className={styles.relatedTitle}>Похожие предложения</h2>
            <div className={styles.relatedNav}>

                <button
                  className={clsx(styles.relatedNavButton, styles.relatedNavButtonLeft)}
                  onClick={() => relatedSwiperRef.current?.slidePrev()}
                  type="button"
                >
                  <img src={chevronRightIcon} alt="Назад" />
                </button>

                <button
                  className={clsx(styles.relatedNavButton, styles.relatedNavButtonRight)}
                  onClick={() => relatedSwiperRef.current?.slideNext()}
                  type="button"
                >
                  <img src={chevronRightIcon} alt="Вперед" />
                </button>

            </div>
          </div>
          
          <div className={styles.relatedSliderWrapper}>
            <Swiper
              modules={[Navigation]}
              onSwiper={(swiper) => {
                relatedSwiperRef.current = swiper;
                swiper.navigation?.destroy();
              }}
              slidesPerView="auto"
              spaceBetween={20}
              className={styles.relatedSwiper}
            >
              {relatedCards.map((c) => (
                <SwiperSlide key={c.id} className={styles.relatedSlide}>
                  <SkillCard card={c} showFavoriteButton={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
      <ExchangeSuggestedModal
        isOpen={isExchangeOpen}
        onClose={() => setIsExchangeOpen(false)}
        card={card}
      />
    </main>
  );
};

export default SkillPage;
