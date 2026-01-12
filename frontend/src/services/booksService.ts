import api from './api'
import type { Book, CreateBookDto, UpdateBookDto } from '../types/book'

export const booksService = {
  getAll: async (): Promise<Book[]> => {
    const response = await api.get<Book[]>('/Books')
    return response.data
  },

  getById: async (id: number): Promise<Book> => {
    const response = await api.get<Book>(`/Books/${id}`)
    return response.data
  },

  create: async (data: CreateBookDto): Promise<Book> => {
    const response = await api.post<Book>('/Books', data)
    return response.data
  },

  update: async (id: number, data: UpdateBookDto): Promise<void> => {
    await api.put(`/Books/${id}`, data)
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/Books/${id}`)
  },
}
