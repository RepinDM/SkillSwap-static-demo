import type { TSubcategory } from "@/entities/category/types";

// Пользовательский навык, который он заполняет сам в форме создания навыка
export type TUserSkill = {
  id: string // Уникальный идентификатор навыка
  userId: string // ID владельца навыка
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