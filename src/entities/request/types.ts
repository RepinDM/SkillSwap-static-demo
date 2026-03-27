import type { TRequestStatus } from '@/shared/lib/constants'

// Заявка на обмен навыком или обучение
export type TRequest = {
  id: string // Уникальный идентификатор заявки
  skillId: string // ID навыка, к которому относится заявка
  fromUserId: string // ID пользователя, который отправил заявку
  toUserId: string // ID пользователя, который получил заявку
  status: TRequestStatus // Текущий статус заявки
  createdAt: string // Дата и время создания заявки
  updatedAt: string // Дата и время последнего обновления заявки
}
