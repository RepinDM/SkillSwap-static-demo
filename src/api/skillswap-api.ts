import type { TCategoryItem, TSubcategory } from "@/entities/category/types";
import type { TSkill } from "@/entities/skill/types";
import type { TUserInfo } from "@/entities/user/types";
import { API_URL } from "./config";

const checkResponse = <T>(res: Response): Promise<T> => {
  console.log("RESPONSE STATUS:", res.status);
  console.log("RESPONSE OK:", res.ok);

  return res.ok
    ? res.json().then((data) => {
        console.log("RESPONSE JSON:", data);
        return data;
      })
    : res.json().then((err) => {
        console.error("RESPONSE ERROR:", err);
        return Promise.reject(err);
      });
};

export type TUserSkillsResponse = {
  userSkillList: TSkill[]
  subcategoryList: TSubcategory[]
  userList: TUserInfo[]
};

export const getUserSkills = () =>
  fetch(`${API_URL}get_user_skill_list`)
    .then((res) => checkResponse<TUserSkillsResponse>(res))
    .then((data) => {
      console.log("PARSED DATA:", data);

      return {
        userSkillList: data.userSkillList,
        subcategoryList: data.subcategoryList, 
        userList: data.userList};
    })
    .catch((error) => {
      console.error("GET USER SKILLS ERROR:", error);
      throw error;
    });

export const getUserById = (
  users: TUserInfo[],
  id: number
):TUserInfo => {
  return users.find((user) => user.id === id)!;
};

export const convertSkillsToCards = (skills:TSkill[], users: TUserInfo[]) => {
  const teachSkills = skills.filter(
    (skill) => skill.skillType === 'teach'
  );

  const learnSkills = skills.filter(
    (skill) => skill.skillType === 'learn'
  );

  // Группировка навыков "Учусь" по пользователям
  const learnSkillsByUser = learnSkills.reduce<Record<number, TSkill[]>>((acc, learnSkill) => {
    const key = learnSkill.userId;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(learnSkill);
      return acc;
    }, {});

  // Список карточек привязаных к навыку "Учу"
  const skillCards = teachSkills.map((teachSkill) => {
    return({
      id: teachSkill.id,
      user: getUserById(users, teachSkill.userId),
      teachSkill: teachSkill,
      learnSkills: learnSkillsByUser[teachSkill.userId] ?? []
    });
  });
  return skillCards;
};

export const convertSubcategoriesToCategoryItems = (
  subcategories: TSubcategory[]
): TCategoryItem[] => {
  const map = subcategories.reduce<Record<number, TCategoryItem>>(
    (acc, subcategory) => {
      const category = subcategory.category;

      if (!acc[category.id]) {
        acc[category.id] = {
          ...category,
          subcategories: []
        };
      }

      acc[category.id].subcategories.push(subcategory);

      return acc;
    },
    {}
  );

  return Object.values(map);
};
