export interface Loan {
  id: number
  bookId: number
  bookTitle: string
  memberId: number
  memberName: string
  loanDate: string
  returnDate?: string
  dueDate: string
  isReturned: boolean
}

export interface CreateLoanDto {
  bookId: number
  memberId: number
  loanDays?: number
}

export interface ReturnLoanDto {
  loanId: number
}
