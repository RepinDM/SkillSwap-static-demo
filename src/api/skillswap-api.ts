import type { TSkill } from "@/entities/skill/types";
import { CATEGORY_COLORS, type CategoryColorKey } from "@/shared/lib/Colors/categoryColors";


/**
 * Для проверки пример:
 * const CatalogPage = () => {
   useEffect(() => {
     getUserSkills();
   }, []);
 */


const URL = import.meta.env.VITE_SKILLSWAP_API_URL;

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

type TUserSkillsResponse = {
  userSkillList: TSkill[];
};

export const getUserSkills = () =>
  fetch(`${URL}/get_user_skill_list`)
    .then((res) => checkResponse<TUserSkillsResponse>(res))
    .then((data) => {
      console.log("PARSED DATA:", data);

      return data.userSkillList;
    })
    .catch((error) => {
      console.error("GET USER SKILLS ERROR:", error);
      throw error;
    });

export const convertSkillsToCards = (skills:TSkill[]) => {
  const teachSkills = skills.filter(
    (skill) => skill.skillType === 'teach'
  );

  const learnSkills = skills.filter(
    (skill) => skill.skillType === 'learn'
  );

  // Группировка навыков "Учусь" по пользователям
  const learnSkillsByUser = learnSkills.reduce<Record<number, TSkill[]>>((acc, learnSkill) => {
    const key = learnSkill.user.id;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(learnSkill);
      return acc;
    }, {});
  
  // Список карточек "Учу"
  const skillCards = teachSkills.map((teachSkill) => {
    return({
      user: teachSkill.user,
      teachSkill: teachSkill,
      learnSkills: learnSkillsByUser[teachSkill.user.id]
    });
  });
  return skillCards;
}

// Получить цвет категории
export const getCategoryColor = (slug: string) =>
  CATEGORY_COLORS[slug as CategoryColorKey] ?? CATEGORY_COLORS.plus;

// Получить возраст пользователя
export const getAge = (birthDate?: string | Date): number | undefined => {
  if (!birthDate) return undefined;

  return new Date().getFullYear() - new Date(birthDate).getFullYear();
};