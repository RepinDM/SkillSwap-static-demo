import type { TRequestStatus } from '@/shared/lib/constants'

// Заявка на обмен навыком или обучение
export type TRequest = {
  id: number // Уникальный идентификатор заявки
  skillId: number // ID навыка, к которому относится заявка
  fromUserId: number // ID пользователя, который отправил заявку
  toUserId: number // ID пользователя, который получил заявку
  status: TRequestStatus // Текущий статус заявки
  createdAt: string // Дата и время создания заявки
  updatedAt: string // Дата и время последнего обновления заявки
}
