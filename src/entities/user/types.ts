import type { TCity } from '@/entities/city/types'

// Пол пользователя
export type TGender = "male" | "female";

// Базовый тип пользователя
export type TUser = {
  id: number // Уникальный идентификатор пользователя
  name: string // Имя пользователя
  email: string // Email пользователя
  password?: string // Пароль пользователя, если используется в auth-форме
  avatar?: string // Основной аватар пользователя
  about?: string // Текст "О себе"
  city: TCity // Город пользователя
  birthDate?: Date // Дата рождения пользователя
  gender?: TGender // Пол пользователя
}

// Данные пользователя для карточек, превью и публичного отображения
export type TUserInfo = Pick<TUser, 'id' | 'name' | 'avatar' | 'about' | 'city' | 'birthDate' | 'gender'>

// Данные пользователя, связанные с авторизацией
export type TUserAuth = Pick<TUser, 'email' | 'password'>

// Расширенный тип пользователя с лайками
export type TUserWithLikes = TUser & {
  likesCount?: number // Общее количество лайков пользователя
  isLikedByCurrentUser?: boolean // Лайкнул ли текущий пользователь этого пользователя
  userLikeListId: number
}