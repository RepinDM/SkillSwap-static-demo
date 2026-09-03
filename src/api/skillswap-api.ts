import type { TCategoryItem, TSubcategory } from "@/entities/category/types";
import type { TCity } from "@/entities/city/types";
import type { TSkill } from "@/entities/skill/types";
import type { TUserInfo } from "@/entities/user/types";
const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok
    ? res.json().then((data) => {
        return data;
      })
    : res.json().then((err) => {
        return Promise.reject(err);
      });
};

export type TUserSkillsResponse = {
  userSkillList: TSkill[]
  subcategoryList: TSubcategory[]
  userList: TUserInfo[]
};

export const getUserSkills = () =>
  fetch(`${import.meta.env.BASE_URL}db/skillswap-data.json`)
    .then((res) => checkResponse<TUserSkillsResponse>(res))
    .then((data) => {

      return {
        userSkillList: data.userSkillList,
        subcategoryList: data.subcategoryList, 
        userList: data.userList};
    })
    .catch((error) => {
      throw error;
    });

export const extractCities = (users: TUserInfo[]): TCity[] => {
  const cities = new Map<number, TCity>();

  users.forEach(({ city }) => {
    if (city.id !== undefined && city.name) {
      cities.set(city.id, { id: city.id, name: city.name });
    }
  });

  return Array.from(cities.values()).sort((first, second) =>
    first.name!.localeCompare(second.name!, "ru"),
  );
};

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
