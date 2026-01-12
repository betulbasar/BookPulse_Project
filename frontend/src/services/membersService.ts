import api from './api'
import type { Member, CreateMemberDto, UpdateMemberDto } from '../types/member'

export const membersService = {
  getAll: async (): Promise<Member[]> => {
    const response = await api.get<Member[]>('/Members')
    return response.data
  },

  getById: async (id: number): Promise<Member> => {
    const response = await api.get<Member>(`/Members/${id}`)
    return response.data
  },

  create: async (data: CreateMemberDto): Promise<Member> => {
    const response = await api.post<Member>('/Members', data)
    return response.data
  },

  update: async (id: number, data: UpdateMemberDto): Promise<void> => {
    await api.put(`/Members/${id}`, data)
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/Members/${id}`)
  },
}
