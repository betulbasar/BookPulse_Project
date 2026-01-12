import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { loansService } from '../services/loansService'
import { booksService } from '../services/booksService'
import { membersService } from '../services/membersService'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import LoanForm from '../components/loans/LoanForm'
import { Plus, Search } from 'lucide-react'
import type { CreateLoanDto, ReturnLoanDto } from '../types/loan'

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
    if (window.confirm('Kitabı iade etmek istediğinize emin misiniz?')) {
      returnMutation.mutate({ loanId })
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Ödünçler</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5 inline mr-2" />
          Yeni Ödünç
        </Button>
      </div>

      <div className="mb-4 flex gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          onClick={() => setFilter('all')}
        >
          Tümü
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          onClick={() => setFilter('active')}
        >
          Aktif
        </Button>
        <Button
          variant={filter === 'returned' ? 'primary' : 'secondary'}
          onClick={() => setFilter('returned')}
        >
          İade Edilmiş
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Yükleniyor...</div>
      ) : filteredLoans && filteredLoans.length > 0 ? (
        <div className="space-y-4">
          {filteredLoans.map((loan) => (
            <Card key={loan.id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {loan.bookTitle}
                  </h3>
                  <p className="text-gray-600 mb-2">Üye: {loan.memberName}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>
                      Ödünç: {new Date(loan.loanDate).toLocaleDateString('tr-TR')}
                    </span>
                    <span>
                      Son Tarih: {new Date(loan.dueDate).toLocaleDateString('tr-TR')}
                    </span>
                    {loan.returnDate && (
                      <span>
                        İade: {new Date(loan.returnDate).toLocaleDateString('tr-TR')}
                      </span>
                    )}
                  </div>
                  {!loan.isReturned && new Date(loan.dueDate) < new Date() && (
                    <span className="inline-block mt-2 text-sm text-red-600 font-medium">
                      ⚠️ Gecikmiş
                    </span>
                  )}
                </div>
                <div>
                  {loan.isReturned ? (
                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded">
                      İade Edildi
                    </span>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => handleReturn(loan.id)}
                    >
                      İade Et
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className="text-center text-gray-500 py-8">
            {filter === 'active'
              ? 'Aktif ödünç yok'
              : filter === 'returned'
              ? 'İade edilmiş ödünç yok'
              : 'Henüz ödünç kaydı yok'}
          </p>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yeni Ödünç"
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
