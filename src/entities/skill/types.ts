
export type TSkill = {
  id: string
  userId: string
  title: string
  description: string
  category: string
  type: TSkillType
  image?: string
  createdDate: Date // Дата создания навыка. В приложении хранится как Date и используется для сортировки.
}

export type TSkillDetails = TSkill & {
  images?: string[]
  subcategoryId?: string
  updatedDate?: string
}

export type TSkillType = 'teach' | 'learn'
