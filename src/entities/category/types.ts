// Категория навыков
export type TCategory = {
  id: number // Уникальный идентификатор категории
  name: string // Название категории
  slug: string // Потребуется для цвета категории
}

// Подкатегория навыков
export type TSubcategory = {
  id: number // Уникальный идентификатор подкатегории
  category: TCategory // родительская категория
  name: string // Название подкатегории
}