import api from './api'
import type { Rating, CreateRatingDto } from '../types/rating'

export const ratingsService = {
  getAll: async (): Promise<Rating[]> => {
    const response = await api.get<Rating[]>('/Ratings')
    return response.data
  },

  getById: async (id: number): Promise<Rating> => {
    const response = await api.get<Rating>(`/Ratings/${id}`)
    return response.data
  },

  getByBookId: async (bookId: number): Promise<Rating[]> => {
    const response = await api.get<Rating[]>(`/Ratings/book/${bookId}`)
    return response.data
  },

  create: async (data: CreateRatingDto): Promise<Rating> => {
    const response = await api.post<Rating>('/Ratings', data)
    return response.data
  },
}
