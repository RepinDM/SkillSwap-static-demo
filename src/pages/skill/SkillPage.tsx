import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
// import { fetchSkillCards } from "@/services/actions/skills";
// import { useEffect } from "react";
// import type { TUserInfo } from "@/entities/user/types";
// import Avatar from '@/shared/image/png/Avatar-example.png'
// import { User } from "@/shared/ui/User/User";
import { Tag } from "@/shared/ui/Tag/Tag";
import { SkillCard } from "@/widgets/SkillCard/SkillCard";

import { Button } from "@/shared/ui/Button/Button";
import { useState } from "react";
import type { RootState } from "@/services/store";
import type { TGender } from "@/entities/user/types";
import type { TSkillType } from "@/entities/skill/types";

export const SkillPage = () => {
  const CARDS_PER_PAGE = 4;
  const [page, setPage] = useState(0);
  const { id } = useParams();
  const skillId = id? Number(id) : undefined;
  const { isLoading, allSkillCards } = useAppSelector(
    (state:RootState) => state.skillCards
  );
  const skill = allSkillCards.find((skill) => skill.id === skillId);

  if (isLoading) return <p>Loading...</p>;
  if (!skill) return <p>Not found</p>;

  const {user, learnSkills, teachSkill} = skill;
  const cards = allSkillCards.filter(y=>y.teachSkill.subcategory.id === teachSkill.subcategory.id);

  const mockData = [ ...cards,
    {
    "id": 14,
    "user": {
        "id": 6,
        "name": "Анна",
        "birthDate": new Date("1995-07-22"),
        "city": {
            "id": 16,
            "name": "Москва"
        },
        "avatar": "",
        "gender": "female" as TGender,
        "about": "Люблю путешествовать и изучать новые культуры"
    },
    "teachSkill": {
        "id": 14,
        "userId": 6,
        "subcategory": {
            "id": 51,
            "name": "Английский",
            "category": {
                "id": 9,
                "name": "Иностранные языки",
                "slug": "foreignlanguages"
            }
        },
        "skillType": "teach" as TSkillType,
        "title": "Английский язык для начинающих",
        "description": "Помогу освоить базу английского: алфавит, грамматику, разговорные фразы. Работаем в удобном темпе",
        "createdDate": new Date("2025-11-06 21:00:00"),
        "images": []
    },
    "learnSkills": [
        {
            "id": 15,
            "userId": 6,
            "subcategory": {
                "id": 78,
                "name": "Йога и медитация",
                "category": {
                    "id": 13,
                    "name": "Здоровье и лайфстайл",
                    "slug": "healthlifestyle"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Йога и медитация",
            "description": "",
            "createdDate": new Date("2025-11-08 21:00:00"),
            "images": []
        },
        {
            "id": 16,
            "userId": 6,
            "subcategory": {
                "id": 67,
                "name": "Музыка и звук",
                "category": {
                    "id": 11,
                    "name": "Творчество и искусство",
                    "slug": "creativityart"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Музыкальная теория",
            "description": "",
            "createdDate": new Date("2026-01-11 21:00:00"),
            "images": []
        },
        {
            "id": 17,
            "userId": 6,
            "subcategory": {
                "id": 62,
                "name": "Ремонт",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Мелкий ремонт",
            "description": "",
            "createdDate": new Date("2025-10-19 21:00:00"),
            "images": []
        },
        {
            "id": 18,
            "userId": 6,
            "subcategory": {
                "id": 60,
                "name": "Приготовление еды",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Правильное питание",
            "description": "",
            "createdDate": new Date("2025-12-07 21:00:00"),
            "images": []
        }
    ]
    },
       {
    "id": 14,
    "user": {
        "id": 6,
        "name": "Анна",
        "birthDate": new Date("1995-07-22"),
        "city": {
            "id": 16,
            "name": "Москва"
        },
        "avatar": "",
        "gender": "female" as TGender,
        "about": "Люблю путешествовать и изучать новые культуры"
    },
    "teachSkill": {
        "id": 14,
        "userId": 6,
        "subcategory": {
            "id": 51,
            "name": "Английский",
            "category": {
                "id": 9,
                "name": "Иностранные языки",
                "slug": "foreignlanguages"
            }
        },
        "skillType": "teach" as TSkillType,
        "title": "Английский язык для начинающих",
        "description": "Помогу освоить базу английского: алфавит, грамматику, разговорные фразы. Работаем в удобном темпе",
        "createdDate": new Date("2025-11-06 21:00:00"),
        "images": []
    },
    "learnSkills": [
        {
            "id": 15,
            "userId": 6,
            "subcategory": {
                "id": 78,
                "name": "Йога и медитация",
                "category": {
                    "id": 13,
                    "name": "Здоровье и лайфстайл",
                    "slug": "healthlifestyle"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Йога и медитация",
            "description": "",
            "createdDate": new Date("2025-11-08 21:00:00"),
            "images": []
        },
        {
            "id": 16,
            "userId": 6,
            "subcategory": {
                "id": 67,
                "name": "Музыка и звук",
                "category": {
                    "id": 11,
                    "name": "Творчество и искусство",
                    "slug": "creativityart"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Музыкальная теория",
            "description": "",
            "createdDate": new Date("2026-01-11 21:00:00"),
            "images": []
        },
        {
            "id": 17,
            "userId": 6,
            "subcategory": {
                "id": 62,
                "name": "Ремонт",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Мелкий ремонт",
            "description": "",
            "createdDate": new Date("2025-10-19 21:00:00"),
            "images": []
        },
        {
            "id": 18,
            "userId": 6,
            "subcategory": {
                "id": 60,
                "name": "Приготовление еды",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Правильное питание",
            "description": "",
            "createdDate": new Date("2025-12-07 21:00:00"),
            "images": []
        }
    ]
    },
       {
    "id": 14,
    "user": {
        "id": 6,
        "name": "Анна",
        "birthDate": new Date("1995-07-22"),
        "city": {
            "id": 16,
            "name": "Москва"
        },
        "avatar": "",
        "gender": "female" as TGender,
        "about": "Люблю путешествовать и изучать новые культуры"
    },
    "teachSkill": {
        "id": 14,
        "userId": 6,
        "subcategory": {
            "id": 51,
            "name": "Английский",
            "category": {
                "id": 9,
                "name": "Иностранные языки",
                "slug": "foreignlanguages"
            }
        },
        "skillType": "teach" as TSkillType,
        "title": "Английский язык для начинающих",
        "description": "Помогу освоить базу английского: алфавит, грамматику, разговорные фразы. Работаем в удобном темпе",
        "createdDate": new Date("2025-11-06 21:00:00"),
        "images": []
    },
    "learnSkills": [
        {
            "id": 15,
            "userId": 6,
            "subcategory": {
                "id": 78,
                "name": "Йога и медитация",
                "category": {
                    "id": 13,
                    "name": "Здоровье и лайфстайл",
                    "slug": "healthlifestyle"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Йога и медитация",
            "description": "",
            "createdDate": new Date("2025-11-08 21:00:00"),
            "images": []
        },
        {
            "id": 16,
            "userId": 6,
            "subcategory": {
                "id": 67,
                "name": "Музыка и звук",
                "category": {
                    "id": 11,
                    "name": "Творчество и искусство",
                    "slug": "creativityart"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Музыкальная теория",
            "description": "",
            "createdDate": new Date("2026-01-11 21:00:00"),
            "images": []
        },
        {
            "id": 17,
            "userId": 6,
            "subcategory": {
                "id": 62,
                "name": "Ремонт",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Мелкий ремонт",
            "description": "",
            "createdDate": new Date("2025-10-19 21:00:00"),
            "images": []
        },
        {
            "id": 18,
            "userId": 6,
            "subcategory": {
                "id": 60,
                "name": "Приготовление еды",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Правильное питание",
            "description": "",
            "createdDate": new Date("2025-12-07 21:00:00"),
            "images": []
        }
    ]
    },
       {
    "id": 14,
    "user": {
        "id": 6,
        "name": "Анна",
        "birthDate": new Date("1995-07-22"),
        "city": {
            "id": 16,
            "name": "Москва"
        },
        "avatar": "",
        "gender": "female" as TGender,
        "about": "Люблю путешествовать и изучать новые культуры"
    },
    "teachSkill": {
        "id": 14,
        "userId": 6,
        "subcategory": {
            "id": 51,
            "name": "Английский",
            "category": {
                "id": 9,
                "name": "Иностранные языки",
                "slug": "foreignlanguages"
            }
        },
        "skillType": "teach" as TSkillType,
        "title": "Английский язык для начинающих",
        "description": "Помогу освоить базу английского: алфавит, грамматику, разговорные фразы. Работаем в удобном темпе",
        "createdDate": new Date("2025-11-06 21:00:00"),
        "images": []
    },
    "learnSkills": [
        {
            "id": 15,
            "userId": 6,
            "subcategory": {
                "id": 78,
                "name": "Йога и медитация",
                "category": {
                    "id": 13,
                    "name": "Здоровье и лайфстайл",
                    "slug": "healthlifestyle"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Йога и медитация",
            "description": "",
            "createdDate": new Date("2025-11-08 21:00:00"),
            "images": []
        },
        {
            "id": 16,
            "userId": 6,
            "subcategory": {
                "id": 67,
                "name": "Музыка и звук",
                "category": {
                    "id": 11,
                    "name": "Творчество и искусство",
                    "slug": "creativityart"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Музыкальная теория",
            "description": "",
            "createdDate": new Date("2026-01-11 21:00:00"),
            "images": []
        },
        {
            "id": 17,
            "userId": 6,
            "subcategory": {
                "id": 62,
                "name": "Ремонт",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Мелкий ремонт",
            "description": "",
            "createdDate": new Date("2025-10-19 21:00:00"),
            "images": []
        },
        {
            "id": 18,
            "userId": 6,
            "subcategory": {
                "id": 60,
                "name": "Приготовление еды",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Правильное питание",
            "description": "",
            "createdDate": new Date("2025-12-07 21:00:00"),
            "images": []
        }
    ]
    },
       {
    "id": 14,
    "user": {
        "id": 6,
        "name": "Анна",
        "birthDate": new Date("1995-07-22"),
        "city": {
            "id": 16,
            "name": "Москва"
        },
        "avatar": "",
        "gender": "female" as TGender,
        "about": "Люблю путешествовать и изучать новые культуры"
    },
    "teachSkill": {
        "id": 14,
        "userId": 6,
        "subcategory": {
            "id": 51,
            "name": "Английский",
            "category": {
                "id": 9,
                "name": "Иностранные языки",
                "slug": "foreignlanguages"
            }
        },
        "skillType": "teach" as TSkillType,
        "title": "Английский язык для начинающих",
        "description": "Помогу освоить базу английского: алфавит, грамматику, разговорные фразы. Работаем в удобном темпе",
        "createdDate": new Date("2025-11-06 21:00:00"),
        "images": []
    },
    "learnSkills": [
        {
            "id": 15,
            "userId": 6,
            "subcategory": {
                "id": 78,
                "name": "Йога и медитация",
                "category": {
                    "id": 13,
                    "name": "Здоровье и лайфстайл",
                    "slug": "healthlifestyle"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Йога и медитация",
            "description": "",
            "createdDate": new Date("2025-11-08 21:00:00"),
            "images": []
        },
        {
            "id": 16,
            "userId": 6,
            "subcategory": {
                "id": 67,
                "name": "Музыка и звук",
                "category": {
                    "id": 11,
                    "name": "Творчество и искусство",
                    "slug": "creativityart"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Музыкальная теория",
            "description": "",
            "createdDate": new Date("2026-01-11 21:00:00"),
            "images": []
        },
        {
            "id": 17,
            "userId": 6,
            "subcategory": {
                "id": 62,
                "name": "Ремонт",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Мелкий ремонт",
            "description": "",
            "createdDate": new Date("2025-10-19 21:00:00"),
            "images": []
        },
        {
            "id": 18,
            "userId": 6,
            "subcategory": {
                "id": 60,
                "name": "Приготовление еды",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Правильное питание",
            "description": "",
            "createdDate": new Date("2025-12-07 21:00:00"),
            "images": []
        }
    ]
    },
        {
    "id": 14,
    "user": {
        "id": 6,
        "name": "Анна",
        "birthDate": new Date("1995-07-22"),
        "city": {
            "id": 16,
            "name": "Москва"
        },
        "avatar": "",
        "gender": "female" as TGender,
        "about": "Люблю путешествовать и изучать новые культуры"
    },
    "teachSkill": {
        "id": 14,
        "userId": 6,
        "subcategory": {
            "id": 51,
            "name": "Английский",
            "category": {
                "id": 9,
                "name": "Иностранные языки",
                "slug": "foreignlanguages"
            }
        },
        "skillType": "teach" as TSkillType,
        "title": "Английский язык для начинающих",
        "description": "Помогу освоить базу английского: алфавит, грамматику, разговорные фразы. Работаем в удобном темпе",
        "createdDate": new Date("2025-11-06 21:00:00"),
        "images": []
    },
    "learnSkills": [
        {
            "id": 15,
            "userId": 6,
            "subcategory": {
                "id": 78,
                "name": "Йога и медитация",
                "category": {
                    "id": 13,
                    "name": "Здоровье и лайфстайл",
                    "slug": "healthlifestyle"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Йога и медитация",
            "description": "",
            "createdDate": new Date("2025-11-08 21:00:00"),
            "images": []
        },
        {
            "id": 16,
            "userId": 6,
            "subcategory": {
                "id": 67,
                "name": "Музыка и звук",
                "category": {
                    "id": 11,
                    "name": "Творчество и искусство",
                    "slug": "creativityart"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Музыкальная теория",
            "description": "",
            "createdDate": new Date("2026-01-11 21:00:00"),
            "images": []
        },
        {
            "id": 17,
            "userId": 6,
            "subcategory": {
                "id": 62,
                "name": "Ремонт",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Мелкий ремонт",
            "description": "",
            "createdDate": new Date("2025-10-19 21:00:00"),
            "images": []
        },
        {
            "id": 18,
            "userId": 6,
            "subcategory": {
                "id": 60,
                "name": "Приготовление еды",
                "category": {
                    "id": 10,
                    "name": "Дом и уют",
                    "slug": "homecomfort"
                }
            },
            "skillType": "learn" as TSkillType,
            "title": "Правильное питание",
            "description": "",
            "createdDate": new Date("2025-12-07 21:00:00"),
            "images": []
        }
    ]
    },
  ];

  const start = page * CARDS_PER_PAGE;

  const similarCards = mockData.slice(
    start,
    start + CARDS_PER_PAGE
  );

  const maxPage = Math.ceil(mockData.length / CARDS_PER_PAGE) - 1;

  const next = () => {
    setPage(prev =>
      prev < maxPage ? prev + 1 : prev
    );
  };

  const prev = () => {
    setPage(prev =>
      prev > 0 ? prev - 1 : prev
    );
  };
  return (
    <>
      <div style={{display:"flex", gap:"24px"}}>
        <SkillCard card={skill} showFavoriteButton={false}/>
        <div>
          <div>
            <h1>{teachSkill.title}</h1>
            <Tag label={teachSkill.subcategory.name} bgColor=""/>
            <p>{teachSkill.description}</p>
            <Button>Предложить обмен</Button>
          </div>
          <div> {/*carousel*/}
            <div>Gallery placeholder</div>
          </div>
        </div>
      </div>

      <div>
        <h2>Похожие предложения</h2>
        <div className="similar" style={{display:"flex", gap:"24px"}}>
          {similarCards.map((card,i) => (
            <SkillCard key={card.id + i} card={card} />
          ))}
        </div>
        <Button onClick={prev} disabled={page === 0}>←</Button>
        <Button onClick={next} disabled={page === maxPage}>→</Button>
      </div>
    </>
  );
};
