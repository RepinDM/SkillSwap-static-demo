import type { TSubcategory } from "@/entities/category/types";
import type { TUserInfo } from "../user/types";

// Пользовательский навык, который он заполняет сам в форме создания навыка
export type TSkill = {
  id: number // Уникальный идентификатор навыка
  userId: number // ID владельца навыка
  subcategory: TSubcategory // Подкатегория к которой относится навык
  title: string // Название пользовательского навыка
  description: string // Краткое описание навыка (используется в карточке и превью)
  skillType: TSkillType // Тип навыка: teach — пользователь учит, learn — пользователь хочет научиться
  images?: string[] // Главное изображение навыка (используется в карточке)
  createdDate: string | Date // Дата создания навыка из JSON или новый ISO-дата для локального демо.
}

// Тип навыка:
// teach — пользователь учит
// learn — пользователь хочет научиться
export type TSkillType = 'teach' | 'learn'

// Тип карточки навыка
export type TSkillCard = {
  id: number
  user: TUserInfo
  teachSkill: TSkill
  learnSkills: TSkill[]
  likesCount?: number
}
