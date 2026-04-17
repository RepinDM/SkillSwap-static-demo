import type { TSkillType } from "../skill/types";
import type { TGender } from "../user/types";

export type TFilters = {
mode: "all" | TSkillType; // "all" | "learn" | "teach"
gender: TGender | null;
cities: string[];
skillIds: number[];

};
