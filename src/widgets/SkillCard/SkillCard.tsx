import { getAge, getCategoryColor } from "@/api/skillswap-api";
import type { TSkillCard } from "@/entities/skill/types";
import { Tag } from "@/shared/ui/Tag/Tag";
import { User } from "@/shared/ui/User/User";

type Props = {
  card: TSkillCard;
};

export const SkillCard = ({ card }: Props) => {
  return (
    <>
       <div key={card.teachSkill.id}>
          <User 
            name={card.user.name}
            avatar={card.user.avatar}
            city={card.user.city.name}
            age={getAge(card.user.birthDate)}
          />

          {/* 2. Чему пользователь УЧИТ (teachSkill) */}
          <div>
            <p>Может научить:</p>
            <Tag
              label={card.teachSkill.title}
              bgColor={getCategoryColor(
                card.teachSkill.subcategory.category.slug
              )}
            />
          </div>

          {/* 3. Чему пользователь хочет научиться (learnSkills - это массив) */}
          <div>
            <p>Хочет научиться:</p>
            <ul>
              {card.learnSkills.map(skill => (
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
    </>
  );
};