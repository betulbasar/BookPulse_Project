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
      title: 'Toplam Kitap',
      value: books?.length || 0,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Aktif Üye',
      value: activeMembers.length,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Aktif Ödünç',
      value: activeLoans.length,
      icon: ClipboardList,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Mevcut Kopya',
      value: books?.reduce((sum, book) => sum + book.availableCopies, 0) || 0,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
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
        <Card title="Son Eklenen Kitaplar">
          {books && books.length > 0 ? (
            <ul className="space-y-2">
              {books.slice(-5).reverse().map((book) => (
                <li key={book.id} className="flex justify-between items-center">
                  <span className="font-medium">{book.title}</span>
                  <span className="text-sm text-gray-500">{book.author}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Henüz kitap eklenmemiş</p>
          )}
        </Card>

        <Card title="Aktif Ödünçler">
          {activeLoans.length > 0 ? (
            <ul className="space-y-2">
              {activeLoans.slice(0, 5).map((loan) => (
                <li key={loan.id} className="flex justify-between items-center">
                  <span className="font-medium">{loan.bookTitle}</span>
                  <span className="text-sm text-gray-500">{loan.memberName}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aktif ödünç yok</p>
          )}
        </Card>
      </div>
    </div>
  )
}
