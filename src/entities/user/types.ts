import type { TCity } from '@/entities/city/types'

export type TGender = 'male' | 'female'

export type TUser = {
  id: string
  name: string
  username?: string
  email: string
  password?: string
  avatar?: string
  images?: string[]
  about?: string
  city?: TCity
  dateOfBirth?: Date
  gender?: TGender
  createdAt?: Date
  lastLoginAt?: Date
}

export type TUserPromo = Pick<TUser, 'id' | 'name' | 'username' | 'avatar' | 'images' | 'about' | 'city' | 'dateOfBirth' | 'gender' | 'lastLoginAt'>

export type TUserAuth = Pick<TUser, 'email' | 'password' | 'createdAt'>

export type TUserWithLikes = TUser & {
  likesCount?: number
  isLikedByCurrentUser?: boolean
}
