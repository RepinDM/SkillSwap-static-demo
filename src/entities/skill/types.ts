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
  image?: string // Главное изображение навыка (используется в карточке)
  createdDate: Date // Дата создания навыка. В приложении хранится как Date и используется для сортировки.
}

// Тип навыка:
// teach — пользователь учит
// learn — пользователь хочет научиться
export type TSkillType = 'teach' | 'learn'

// Тип карточки навыка
export type TSkillCard = {
  user: TUserInfo
  teachSkill: TSkill
  learnSkills: TSkill[]
}