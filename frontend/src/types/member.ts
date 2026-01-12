export interface Member {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  registrationDate: string
  isActive: boolean
}

export interface CreateMemberDto {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
}

export interface UpdateMemberDto {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  isActive?: boolean
}
