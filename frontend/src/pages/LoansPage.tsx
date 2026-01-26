import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { loansService } from '../services/loansService'
import { booksService } from '../services/booksService'
import { membersService } from '../services/membersService'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import LoanForm from '../components/loans/LoanForm'
import { Plus } from 'lucide-react'
import type { CreateLoanDto } from '../types/loan'

export default function LoansPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'returned'>('all')
  const queryClient = useQueryClient()

  const { data: loans, isLoading } = useQuery({
    queryKey: ['loans'],
    queryFn: loansService.getAll,
  })

  const returnMutation = useMutation({
    mutationFn: loansService.return,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] })
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })

  const filteredLoans = loans?.filter((loan) => {
    if (filter === 'active') return !loan.isReturned
    if (filter === 'returned') return loan.isReturned
    return true
  })

  const handleReturn = async (loanId: number) => {
    if (window.confirm('Are you sure you want to return this book?')) {
      returnMutation.mutate({ loanId })
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-800 dark:text-pink-200">Loans</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5 inline mr-2" />
          New Loan
        </Button>
      </div>

      <div className="mb-4 flex gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'returned' ? 'primary' : 'secondary'}
          onClick={() => setFilter('returned')}
        >
          Returned
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading...</div>
      ) : filteredLoans && filteredLoans.length > 0 ? (
        <div className="space-y-4">
          {filteredLoans.map((loan) => (
            <Card key={loan.id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {loan.bookTitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Member: {loan.memberName}</p>
                  <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      Loaned: {new Date(loan.loanDate).toLocaleDateString('en-US')}
                    </span>
                    <span>
                      Due Date: {new Date(loan.dueDate).toLocaleDateString('en-US')}
                    </span>
                    {loan.returnDate && (
                      <span>
                        Returned: {new Date(loan.returnDate).toLocaleDateString('en-US')}
                      </span>
                    )}
                  </div>
                  {!loan.isReturned && new Date(loan.dueDate) < new Date() && (
                    <span className="inline-block mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
                      ⚠️ Overdue
                    </span>
                  )}
                </div>
                <div>
                  {loan.isReturned ? (
                    <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded">
                      Returned
                    </span>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => handleReturn(loan.id)}
                    >
                      Return
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            {filter === 'active'
              ? 'No active loans'
              : filter === 'returned'
              ? 'No returned loans'
              : 'No loans yet'}
          </p>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Loan"
      >
        <LoanForm
          onSubmit={async (data: CreateLoanDto) => {
            await loansService.create(data)
            queryClient.invalidateQueries({ queryKey: ['loans'] })
            queryClient.invalidateQueries({ queryKey: ['books'] })
            setIsModalOpen(false)
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
