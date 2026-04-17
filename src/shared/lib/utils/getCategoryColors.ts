// Цвет тега определяется не напрямую, а через CATEGORY_COLORS.
//   Мы не используем hex в компонентах — только дизайн-токены.
// Тут цвета фонов тега,в

export const CATEGORY_COLORS = {
  'businesscareer': "var(--tag-business-career)",
  'creativityart': "var(--tag-creativity-art)",
  'foreignlanguages': "var(--tag-foreign-languages)",
  'educationdevelopment': "var(--tag-education-development)",
  'homecomfort': "var(--tag-home-comfort)",
  'healthlifestyle': "var(--tag-health-lifestyle)",
  'plus': "var(--tag-plus)",
} as const;

export type CategoryColorKey = keyof typeof CATEGORY_COLORS;

// Получить цвет категории
export const getCategoryColor = (slug: string) =>
  CATEGORY_COLORS[slug as CategoryColorKey] ?? CATEGORY_COLORS.plus;