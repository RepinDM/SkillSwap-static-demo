import type { TCity } from '@/entities/city/types'

// Пол пользователя
export type TGender = 'male' | 'female'

// Базовый тип пользователя
export type TUser = {
  id: string // Уникальный идентификатор пользователя
  name: string // Имя пользователя
  username?: string // Никнейм пользователя
  email: string // Email пользователя
  password?: string // Пароль пользователя, если используется в auth-форме
  avatar?: string // Основной аватар пользователя
  images?: string[] // Дополнительные изображения пользователя
  about?: string // Текст "О себе"
  city?: TCity // Город пользователя
  dateOfBirth?: Date // Дата рождения пользователя
  gender?: TGender // Пол пользователя
  createdAt?: Date // Дата регистрации на платформе
  lastLoginAt?: Date // Дата и время последнего входа
}

// Данные пользователя для карточек, превью и публичного отображения
export type TUserPromo = Pick<TUser, 'id' | 'name' | 'username' | 'avatar' | 'images' | 'about' | 'city' | 'dateOfBirth' | 'gender' | 'lastLoginAt'>

// Данные пользователя, связанные с авторизацией
export type TUserAuth = Pick<TUser, 'email' | 'password' | 'createdAt'>

// Расширенный тип пользователя с лайками
export type TUserWithLikes = TUser & {
  likesCount?: number // Общее количество лайков пользователя
  isLikedByCurrentUser?: boolean // Лайкнул ли текущий пользователь этого пользователя
}
