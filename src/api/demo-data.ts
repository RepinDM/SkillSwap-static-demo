import type { TSubcategory } from "@/entities/category/types";
import type { TSkill } from "@/entities/skill/types";
import type { TUserAuth, TUserInfo } from "@/entities/user/types";
import { readStoredJson, writeStoredJson } from "@/shared/lib/storage";
import type { TUserSkillsResponse } from "./skillswap-api";

const DEMO_DATA_KEY = "skillswap-demo-data-v1";
export const MAX_DEMO_IMAGE_SIZE = 2 * 1024 * 1024;

type DemoData = {
  users: TUserInfo[];
  skills: TSkill[];
  removedSkillIds: number[];
};

const emptyDemoData = (): DemoData => ({
  users: [],
  skills: [],
  removedSkillIds: [],
});

const readDemoData = () => readStoredJson(DEMO_DATA_KEY, emptyDemoData());

const saveDemoData = (data: DemoData) => writeStoredJson(DEMO_DATA_KEY, data);

const replaceById = <T extends { id: number }>(items: T[], item: T) => [
  ...items.filter(({ id }) => id !== item.id),
  item,
];

const nextSkillId = (data: TUserSkillsResponse, demoData: DemoData) =>
  Math.max(0, ...data.userSkillList.map(({ id }) => id), ...demoData.skills.map(({ id }) => id)) + 1;

export const validateDemoImage = (file: File) => {
  if (!file.type.startsWith("image/")) {
    return "Можно загрузить только изображение";
  }

  if (file.size > MAX_DEMO_IMAGE_SIZE) {
    return "Размер изображения не должен превышать 2 МБ";
  }

  return null;
};

export const fileToDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const validationError = validateDemoImage(file);

  if (validationError) {
    reject(new Error(validationError));
    return;
  }

  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result));
  reader.onerror = () => reject(new Error("Не удалось прочитать изображение"));
  reader.readAsDataURL(file);
});

const getSubcategory = (subcategories: TSubcategory[], id: string) => {
  const subcategory = subcategories.find(({ id: subcategoryId }) => subcategoryId === Number(id));

  if (!subcategory) {
    throw new Error("Выберите существующую подкатегорию");
  }

  return subcategory;
};

export const mergeDemoData = (data: TUserSkillsResponse): TUserSkillsResponse => {
  const demoData = readDemoData();
  const users = new Map(data.userList.map((user) => [user.id, user]));
  const skills = new Map(data.userSkillList.map((skill) => [skill.id, skill]));

  demoData.users.forEach((user) => users.set(user.id, user));
  demoData.skills.forEach((skill) => skills.set(skill.id, skill));
  demoData.removedSkillIds.forEach((id) => skills.delete(id));

  return {
    ...data,
    userList: Array.from(users.values()),
    userSkillList: Array.from(skills.values()),
  };
};

export const saveDemoUserData = (user: TUserAuth) => {
  const demoData = readDemoData();
  demoData.users = replaceById(demoData.users, user);
  saveDemoData(demoData);
};

export const removeDemoUserData = (userId: number) => {
  const demoData = readDemoData();
  const ownedSkillIds = demoData.skills
    .filter((skill) => skill.userId === userId)
    .map((skill) => skill.id);

  demoData.users = demoData.users.filter((user) => user.id !== userId);
  demoData.skills = demoData.skills.filter((skill) => skill.userId !== userId);
  demoData.removedSkillIds = [...new Set([...demoData.removedSkillIds, ...ownedSkillIds])];
  saveDemoData(demoData);
};

export const saveDemoTeachSkill = async (
  data: TUserSkillsResponse,
  userId: number,
  payload: {
    title: string;
    description: string;
    subcategoryId: string;
    images: File[];
    existingImageUrls: string[];
  },
) => {
  const demoData = readDemoData();
  const existingSkill = data.userSkillList.find(
    (skill) => skill.userId === userId && skill.skillType === "teach",
  );
  const images = payload.images.length > 0
    ? await Promise.all(payload.images.map(fileToDataUrl))
    : payload.existingImageUrls;
  const skill: TSkill = {
    id: existingSkill?.id ?? nextSkillId(data, demoData),
    userId,
    subcategory: getSubcategory(data.subcategoryList, payload.subcategoryId),
    title: payload.title.trim(),
    description: payload.description.trim(),
    skillType: "teach",
    images,
    createdDate: existingSkill?.createdDate ?? new Date().toISOString(),
  };

  demoData.skills = replaceById(demoData.skills, skill);
  demoData.removedSkillIds = demoData.removedSkillIds.filter((id) => id !== skill.id);
  saveDemoData(demoData);
  return skill;
};

export const saveDemoLearnSkills = (
  data: TUserSkillsResponse,
  userId: number,
  skills: { subcategoryId: string }[],
) => {
  const demoData = readDemoData();
  const existingSkills = data.userSkillList.filter(
    (skill) => skill.userId === userId && skill.skillType === "learn",
  );
  const startId = nextSkillId(data, demoData);
  const newSkills = skills.map((skill, index): TSkill => ({
    id: startId + index,
    userId,
    subcategory: getSubcategory(data.subcategoryList, skill.subcategoryId),
    title: "",
    description: "",
    skillType: "learn",
    createdDate: new Date().toISOString(),
  }));

  demoData.skills = demoData.skills.filter(
    (skill) => !(skill.userId === userId && skill.skillType === "learn"),
  );
  demoData.skills.push(...newSkills);
  demoData.removedSkillIds = [...new Set([
    ...demoData.removedSkillIds,
    ...existingSkills.map((skill) => skill.id),
  ])];
  saveDemoData(demoData);
  return newSkills;
};
