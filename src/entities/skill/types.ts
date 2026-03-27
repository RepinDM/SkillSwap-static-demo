
// Основной тип навыка (для списков, карточек)
export type TSkill = {
  id: string // Уникальный идентификатор навыка
  userId: string // ID владельца навыка
  title: string // Название навыка
  description: string // Краткое описание навыка (используется в карточке и превью)
  category: string // Основная категория
  type: TSkillType // Тип навыка: teach — пользователь учит, learn — пользователь хочет научиться
  image?: string // Главное изображение навыка (используется в карточке)
  createdDate: Date // Дата создания навыка. В приложении хранится как Date и используется для сортировки.
}

// Расширенный тип (для страницы детали)
export type TSkillDetails = TSkill & {
  images?: string[] // Дополнительные изображения навыка (галерея на странице)
  subcategoryId?: string // ID подкатегории
  updatedDate?: string // Дата последнего изменения навыка
}

// Тип навыка:
// teach — пользователь учит
// learn — пользователь хочет научиться
export type TSkillType = 'teach' | 'learn'
