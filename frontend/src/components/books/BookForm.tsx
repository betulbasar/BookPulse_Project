import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '../common/Input'
import Button from '../common/Button'
import type { CreateBookDto } from '../../types/book'

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().optional(),
  totalCopies: z.number().min(1, 'At least 1 copy is required'),
})

interface BookFormProps {
  onSubmit: (data: CreateBookDto) => Promise<void>
  onCancel: () => void
}

export default function BookForm({ onSubmit, onCancel }: BookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateBookDto>({
    resolver: zodResolver(bookSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Book Title"
        {...register('title')}
        error={errors.title?.message}
      />
      <Input
        label="Author"
        {...register('author')}
        error={errors.author?.message}
      />
      <Input
        label="ISBN (Optional)"
        {...register('isbn')}
        error={errors.isbn?.message}
      />
      <Input
        label="Total Copies"
        type="number"
        {...register('totalCopies', { valueAsNumber: true })}
        error={errors.totalCopies?.message}
      />
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
