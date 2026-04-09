import { useParams } from "react-router-dom";
import { useAppSelector } from "@/services/hooks";
import { getAge, getCategoryColor } from "@/api/skillswap-api";
import { Tag } from "@/shared/ui/Tag/Tag";
import { User } from "@/shared/ui/User/User";
import { SkillCard } from "@/widgets/SkillCard/SkillCard";
import buttonLike from "@/shared/image/icons/like.svg";
// import styles from "./SkillPage.module.scss";

  

export const SkillPage = () => {
    const { id } = useParams<{ id: string }>();
    const allCards = useAppSelector((state) => state.skillCards.allSkillCards);
    const card = allCards.find((c) => c.id === Number(id));

    if (!card) return <p>Навык не найден</p>;
    const { user, teachSkill, learnSkills } = card;
    const related = allCards.filter(
        (c) =>
        c.id !== card.id &&
        c.teachSkill.subcategory.id ===
        teachSkill.subcategory.id
    ).slice(0, 4);

    return (

        <main>
            {/* ── Верхний блок ── */}
            <section>

                {/* Левая колонка — автор */}
                <div>
                    <User
                        avatar={user.avatar}
                        name={user.name}
                        city={user.city.name}
                        age={getAge(user.birthDate)}
                        avatarSize={64}
                        about={user.about}
                    />
                    <div>
                        <h4>Может научить</h4>
                        <Tag
                            label={teachSkill.title}
                            bgColor={getCategoryColor(teachSkill.subcategory.category.slug)}
                        />
                    </div>

                    <div>
                        <h4>Хочет научиться</h4>
                        <ul>
                            {learnSkills.map((skill) => (
                            <li key={skill.id}>
                                <Tag
                                    label={skill.subcategory.name}
                                    bgColor={getCategoryColor(
                                    skill.subcategory.category.slug
                                    )}
                                />
                            </li>
                            ))}
                        </ul>
                    </div>

                </div>

                
                {/* Центральная колонка — описание навыка */}
                <div>
                    <div>

                        <img src={buttonLike} alt="Избранное" />
                        {/* иконки поделиться и меню — заглушки пока */}
                        <span>⤴</span>
                        <span>···</span>

                    </div>

                    <h1>{teachSkill.title}</h1>
                    <p>{teachSkill.subcategory.category.name} / {teachSkill.subcategory.name}</p>
                    <p>{teachSkill.description}</p>
                    <button>Предложить обмен</button>

                </div>

                    

                {/* Правая колонка — галерея */}

                {/* <div className={styles.gallery}>

                {teachSkill.images && teachSkill.images.length > 0 ? (

                <>

                <div className={styles.galleryMain}>

                <img

                src={teachSkill.images[0]}

                alt={teachSkill.title}

                className={styles.galleryMainImg}

                />

                <button className={styles.galleryPrev}>‹</button>

                <button className={styles.galleryNext}>›</button>

                </div>

                <div className={styles.galleryThumbs}>

                {teachSkill.images.slice(1, 4).map((img, i) => (

                <div key={i} className={styles.galleryThumb}>

                <img src={img} alt="" />

                {i === 2 && teachSkill.images!.length > 4 && (

                <div className={styles.galleryMore}>

                +{teachSkill.images!.length - 4}

                </div>

                )}

                </div>

                ))}

                </div>

                </>

                ) : (

                <div className={styles.galleryEmpty}>Нет фото</div>

                )}

                </div> */}
            </section>

            {/* ── Похожие предложения ── */}
            {related.length > 0 && (
                <section>
                    <h2>Похожие предложения</h2>
                    <ul>
                        {related.map((c) => (
                            <SkillCard key={c.id} card={c} />
                        ))}
                    </ul>
                </section>
            )}
        </main>
    );
};

export default SkillPage;