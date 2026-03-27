export const CATEGORIES = [
  "Бизнес и карьера",
  "Творчество и искусство",
  "Иностранные языки",
  "Образование и развитие",
  "Здоровье и лайфстайл",
  "Дом и уют",
] as const;

export type TCategory = typeof CATEGORIES[number];

export const REQUEST_STATUSES = [
  "pending", "accepted", "rejected", "inProgress", "done"
] as const;

export type TRequestStatus = typeof REQUEST_STATUSES[number];