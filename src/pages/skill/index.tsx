import { useParams } from "react-router-dom";
import { useAppSelector } from "@/services/hooks";

import { Tag } from "@/shared/ui/Tag/Tag";
import { User } from "@/shared/ui/User/User";
import { SkillCard } from "@/widgets/SkillCard/SkillCard";
import buttonLike from "@/shared/image/icons/like.svg";
import { getAge } from "@/shared/lib/utils/getAge";
import { getCategoryColor } from "@/shared/lib/utils/getCategoryColors";
import { selectAllSkillCards } from "@/services/slices/skillCardsSlice";

export const SkillPage = () => {
  const { id } = useParams<{ id: string }>();
  const allCards = useAppSelector(selectAllSkillCards);
  const card = allCards.find((c) => c.id === Number(id));

  if (!card) return <p>Навык не найден</p>;

  const { user, teachSkill, learnSkills } = card;

  const images = teachSkill.images ?? [];

  const related = allCards
    .filter(
      (c) =>
        c.id !== card.id &&
        c.teachSkill.subcategory.id === teachSkill.subcategory.id
    )
    .slice(0, 4);

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
              bgColor={getCategoryColor(
                teachSkill.subcategory.category.slug
              )}
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
            <span>⤴</span>
            <span>···</span>
          </div>

          <h1>{teachSkill.title}</h1>

          <p>
            {teachSkill.subcategory.category.name} /{" "}
            {teachSkill.subcategory.name}
          </p>

          <p>{teachSkill.description}</p>

          <button>Предложить обмен</button>
        </div>

        {/* Правая колонка — галерея */}
        <div>
          {images.length > 0 ? (
            <>
              <div>
                <img src={images[0]} alt={teachSkill.title} />
                <button>‹</button>
                <button>›</button>
              </div>

              <div>
                {images.slice(1, 4).map((img: string, i: number) => (
                  <div key={i}>
                    <img src={img} alt="" />
                    {i === 2 && images.length > 4 && (
                      <div>+{images.length - 4}</div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>Нет фото</div>
          )}
        </div>
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