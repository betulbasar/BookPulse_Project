import api from './api'
import type { Loan, CreateLoanDto, ReturnLoanDto } from '../types/loan'

export const loansService = {
  getAll: async (): Promise<Loan[]> => {
    const response = await api.get<Loan[]>('/Loans')
    return response.data
  },

  getById: async (id: number): Promise<Loan> => {
    const response = await api.get<Loan>(`/Loans/${id}`)
    return response.data
  },

  create: async (data: CreateLoanDto): Promise<Loan> => {
    const response = await api.post<Loan>('/Loans', data)
    return response.data
  },

  return: async (data: ReturnLoanDto): Promise<Loan> => {
    const response = await api.post<Loan>('/Loans/return', data)
    return response.data
  },
}
