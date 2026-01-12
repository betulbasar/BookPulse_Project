import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '../common/Input'
import Button from '../common/Button'
import type { CreateBookDto } from '../../types/book'

const bookSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir'),
  author: z.string().min(1, 'Yazar gereklidir'),
  isbn: z.string().optional(),
  totalCopies: z.number().min(1, 'En az 1 kopya olmalıdır'),
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
        label="Kitap Başlığı"
        {...register('title')}
        error={errors.title?.message}
      />
      <Input
        label="Yazar"
        {...register('author')}
        error={errors.author?.message}
      />
      <Input
        label="ISBN (Opsiyonel)"
        {...register('isbn')}
        error={errors.isbn?.message}
      />
      <Input
        label="Toplam Kopya Sayısı"
        type="number"
        {...register('totalCopies', { valueAsNumber: true })}
        error={errors.totalCopies?.message}
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
