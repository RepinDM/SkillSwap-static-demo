import type { TSkill } from "@/entities/skill/types";


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