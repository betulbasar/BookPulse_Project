import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { booksService } from '../../services/booksService'
import { membersService } from '../../services/membersService'
import Input from '../common/Input'
import Button from '../common/Button'
import type { CreateLoanDto } from '../../types/loan'

const loanSchema = z.object({
  bookId: z.number().min(1, 'Kitap seçiniz'),
  memberId: z.number().min(1, 'Üye seçiniz'),
  loanDays: z.number().min(1).max(30).default(14),
})

interface LoanFormProps {
  onSubmit: (data: CreateLoanDto) => Promise<void>
  onCancel: () => void
}

export default function LoanForm({ onSubmit, onCancel }: LoanFormProps) {
  const { data: books } = useQuery({
    queryKey: ['books'],
    queryFn: booksService.getAll,
  })

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: membersService.getAll,
  })

  const availableBooks = books?.filter((book) => book.availableCopies > 0) || []
  const activeMembers = members?.filter((member) => member.isActive) || []

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateLoanDto>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      loanDays: 14,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kitap
        </label>
        <select
          {...register('bookId', { valueAsNumber: true })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.bookId ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Kitap seçiniz</option>
          {availableBooks.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} - {book.author} ({book.availableCopies} mevcut)
            </option>
          ))}
        </select>
        {errors.bookId && (
          <p className="mt-1 text-sm text-red-500">{errors.bookId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Üye
        </label>
        <select
          {...register('memberId', { valueAsNumber: true })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.memberId ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Üye seçiniz</option>
          {activeMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.firstName} {member.lastName} - {member.email}
            </option>
          ))}
        </select>
        {errors.memberId && (
          <p className="mt-1 text-sm text-red-500">{errors.memberId.message}</p>
        )}
      </div>

      <Input
        label="Ödünç Süresi (Gün)"
        type="number"
        {...register('loanDays', { valueAsNumber: true })}
        error={errors.loanDays?.message}
        defaultValue={14}
      />

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  )
}
