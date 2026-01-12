import { useQuery } from '@tanstack/react-query'
import { booksService } from '../services/booksService'
import { membersService } from '../services/membersService'
import { loansService } from '../services/loansService'
import Card from '../components/common/Card'
import { BookOpen, Users, ClipboardList, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const { data: books } = useQuery({
    queryKey: ['books'],
    queryFn: booksService.getAll,
  })

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: membersService.getAll,
  })

  const { data: loans } = useQuery({
    queryKey: ['loans'],
    queryFn: loansService.getAll,
  })

  const activeLoans = loans?.filter((loan) => !loan.isReturned) || []
  const activeMembers = members?.filter((member) => member.isActive) || []

  const stats = [
    {
      title: 'Total Books',
      value: books?.length || 0,
      icon: BookOpen,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
    {
      title: 'Active Members',
      value: activeMembers.length,
      icon: Users,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
    },
    {
      title: 'Active Loans',
      value: activeLoans.length,
      icon: ClipboardList,
      color: 'text-fuchsia-500',
      bgColor: 'bg-fuchsia-50',
    },
    {
      title: 'Available Copies',
      value: books?.reduce((sum, book) => sum + book.availableCopies, 0) || 0,
      icon: TrendingUp,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pink-700 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-pink-600 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recently Added Books" className="bg-green-50 border-green-200">
          {books && books.length > 0 ? (
            <ul className="space-y-2">
              {books.slice(-5).reverse().map((book) => (
                <li key={book.id} className="flex justify-between items-center py-2 border-b border-pink-100 last:border-0">
                  <span className="font-medium text-pink-800">{book.title}</span>
                  <span className="text-sm text-pink-600">{book.author}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-pink-400">No books added yet</p>
          )}
        </Card>

        <Card title="Active Loans" className="bg-green-50 border-green-200">
          {activeLoans.length > 0 ? (
            <ul className="space-y-2">
              {activeLoans.slice(0, 5).map((loan) => (
                <li key={loan.id} className="flex justify-between items-center py-2 border-b border-green-100 last:border-0">
                  <span className="font-medium text-pink-800">{loan.bookTitle}</span>
                  <span className="text-sm text-pink-600">{loan.memberName}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-pink-400">No active loans</p>
          )}
        </Card>
      </div>
    </div>
  )
}
