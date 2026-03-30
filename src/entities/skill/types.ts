import type { TSubcategory } from "@/entities/category/types";
import type { TUserPromo } from "../user/types";

// Пользовательский навык, который он заполняет сам в форме создания навыка
export type TUserSkill = {
  id: number // Уникальный идентификатор навыка
  user: TUserPromo // ID владельца навыка
  subCategory: TSubcategory
  title: string // Название пользовательского навыка
  description: string // Краткое описание навыка (используется в карточке и превью)
  type: TSkillType // Тип навыка: teach — пользователь учит, learn — пользователь хочет научиться
  image?: string // Главное изображение навыка (используется в карточке)
  createdDate: Date // Дата создания навыка. В приложении хранится как Date и используется для сортировки.
}

// Тип навыка:
// teach — пользователь учит
// learn — пользователь хочет научиться
export type TSkillType = 'teach' | 'learn'

// Тип карточки навыка
export type TUserSkillCard = {
  user: TUserPromo
  teachSkill: TUserSkill
  learnSkillList: TUserSkill[]
}