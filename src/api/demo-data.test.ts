import { afterEach, describe, expect, it } from "vitest";
import {
  mergeDemoData,
  saveDemoLearnSkills,
  saveDemoTeachSkill,
  saveDemoUserData,
} from "./demo-data";
import type { TUserSkillsResponse } from "./skillswap-api";

const data: TUserSkillsResponse = {
  userList: [
    {
      id: 1,
      name: "Анна",
      city: { id: 1, name: "Москва" },
    },
  ],
  subcategoryList: [
    {
      id: 10,
      name: "Рисование",
      category: { id: 2, name: "Творчество", slug: "art" },
    },
  ],
  userSkillList: [],
};

afterEach(() => localStorage.clear());

describe("demo data store", () => {
  it("adds a registered user and their teach skill to the static catalogue", async () => {
    saveDemoUserData({
      id: 100,
      email: "demo@skillswap.local",
      name: "Демо",
      city: { id: 1, name: "Москва" },
    });
    await saveDemoTeachSkill(data, 100, {
      title: "Скетчинг",
      description: "Научу основам скетчинга",
      subcategoryId: "10",
      images: [],
      existingImageUrls: [],
    });

    const merged = mergeDemoData(data);

    expect(merged.userList).toContainEqual(expect.objectContaining({ id: 100 }));
    expect(merged.userSkillList).toContainEqual(expect.objectContaining({
      userId: 100,
      title: "Скетчинг",
      skillType: "teach",
    }));
  });

  it("replaces learn skills instead of duplicating them", () => {
    saveDemoLearnSkills(data, 1, [{ subcategoryId: "10" }]);
    saveDemoLearnSkills(data, 1, [{ subcategoryId: "10" }]);

    const merged = mergeDemoData(data);

    expect(merged.userSkillList.filter((skill) => skill.skillType === "learn")).toHaveLength(1);
  });
});
