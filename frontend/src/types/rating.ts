export interface Rating {
  id: number
  bookId: number
  bookTitle: string
  memberId: number
  memberName: string
  loanId: number
  score: number
  comment?: string
  createdAt: string
}

export interface CreateRatingDto {
  loanId: number
  score: number
  comment?: string
}
