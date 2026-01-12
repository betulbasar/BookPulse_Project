export interface Book {
  id: number
  title: string
  author: string
  isbn?: string
  totalCopies: number
  availableCopies: number
  averageRating?: number
  createdAt: string
}

export interface CreateBookDto {
  title: string
  author: string
  isbn?: string
  totalCopies: number
}

export interface UpdateBookDto {
  title?: string
  author?: string
  isbn?: string
  totalCopies?: number
}
