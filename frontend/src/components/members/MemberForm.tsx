import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '../common/Input'
import Button from '../common/Button'
import type { CreateMemberDto } from '../../types/member'

const memberSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().optional(),
})

interface MemberFormProps {
  onSubmit: (data: CreateMemberDto) => Promise<void>
  onCancel: () => void
}

export default function MemberForm({ onSubmit, onCancel }: MemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateMemberDto>({
    resolver: zodResolver(memberSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="First Name"
        {...register('firstName')}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        {...register('lastName')}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Phone (Optional)"
        {...register('phoneNumber')}
        error={errors.phoneNumber?.message}
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
