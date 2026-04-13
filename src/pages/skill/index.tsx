import { useParams } from "react-router-dom";
import { useAppSelector } from "@/services/hooks";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { SkillCard } from "@/widgets/SkillCard/SkillCard";
import { UserSkillPage } from "./UserSkillPage";
import buttonLike from "@/shared/image/icons/like.svg";
import shareIcon from "@/shared/image/icons/share.svg";
import moreIcon from "@/shared/image/icons/more-square.svg";
import chevronRightIcon from "@/shared/image/icons/chevron-right.svg";
import { getAge } from "@/shared/lib/utils/getAge";
import { selectAllSkillCards } from "@/services/slices/skillCardsSlice";

// Импорт стилей Swiper
import "swiper/css";
import "swiper/css/navigation";

import styles from "./SkillPage.module.scss";

export const SkillPage = () => {
  const { id } = useParams<{ id: string }>();
  const allCards = useAppSelector(selectAllSkillCards);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPrevVisible, setIsPrevVisible] = useState(false);
  const [isNextVisible, setIsNextVisible] = useState(true);
  const swiperRef = useRef<any>(null);

  const card = allCards.find((c) => c.id === Number(id));

  if (!card) return <p>Навык не найден</p>;

  const { user, teachSkill, learnSkills } = card;
  const images = teachSkill.images ?? [];
  const displayImages = images;

  // Похожие предложения
  const related = allCards
    .filter(
      (c) =>
        c.id !== card.id &&
        c.teachSkill.subcategory.id === teachSkill.subcategory.id
    );

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Безопасное получение возраста
  const userAge = user.birthDate ? getAge(user.birthDate) : undefined;

  // Функции для навигации слайдера похожих предложений
  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper: any) => {
    setIsPrevVisible(!swiper.isBeginning);
    setIsNextVisible(!swiper.isEnd);
  };

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
              <button className={styles.iconButton}>
                <img src={buttonLike} alt="Избранное" />
              </button>
              <button className={styles.iconButton}>
                <img src={shareIcon} alt="Поделиться" />
              </button>
              <button className={styles.iconButton}>
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

              <button className={styles.exchangeButton}>Предложить обмен</button>
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
                      onSlideChange={(swiper) => setSelectedImageIndex(swiper.activeIndex)}
                      initialSlide={selectedImageIndex}
                      className={styles.mainSwiper}
                    >
                      {displayImages.map((img, i) => (
                        <SwiperSlide key={i}>
                          <img src={img} alt={`${teachSkill.title} - ${i + 1}`} className={styles.mainImage} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    
                    <button className={`${styles.swiperNav} ${styles.swiperPrev}`}>
                      <img src={chevronRightIcon} alt="Назад" className={styles.prevIcon} />
                    </button>
                    <button className={`${styles.swiperNav} ${styles.swiperNext}`}>
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
                            className={`${styles.thumbnail} ${selectedImageIndex === i ? styles.activeThumbnail : ""}`}
                            onClick={() => handleImageSelect(i)}
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
              {isPrevVisible && (
                <button className={styles.relatedNavButton} onClick={handlePrevClick}>
                  <img src={chevronRightIcon} alt="Назад" className={styles.relatedPrevIcon} />
                </button>
              )}
              {isNextVisible && (
                <button className={styles.relatedNavButton} onClick={handleNextClick}>
                  <img src={chevronRightIcon} alt="Вперед" />
                </button>
              )}
            </div>
          </div>
          
          <div className={styles.relatedSliderWrapper}>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                handleSlideChange(swiper);
              }}
              onSlideChange={handleSlideChange}
              slidesPerView="auto"
              spaceBetween={20}
              className={styles.relatedSwiper}
            >
              {related.map((c) => (
                <SwiperSlide key={c.id} className={styles.relatedSlide}>
                  <SkillCard card={c} showFavoriteButton={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </main>
  );
};

export default SkillPage;