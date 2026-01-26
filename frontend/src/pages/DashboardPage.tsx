import { useQuery } from '@tanstack/react-query'
import { booksService } from '../services/booksService'
import { membersService } from '../services/membersService'
import { loansService } from '../services/loansService'
import Card from '../components/common/Card'
import { useTheme } from '../contexts/ThemeContext'
import { BookOpen, Users, ClipboardList, TrendingUp, Moon, Sun } from 'lucide-react'

export default function DashboardPage() {
  const { theme, toggleTheme } = useTheme()
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
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    },
    {
      title: 'Active Members',
      value: activeMembers.length,
      icon: Users,
      color: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-900/30',
    },
    {
      title: 'Active Loans',
      value: activeLoans.length,
      icon: ClipboardList,
      color: 'text-fuchsia-500 dark:text-fuchsia-400',
      bgColor: 'bg-fuchsia-50 dark:bg-fuchsia-900/30',
    },
    {
      title: 'Available Copies',
      value: books?.reduce((sum, book) => sum + book.availableCopies, 0) || 0,
      icon: TrendingUp,
      color: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/30',
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-800 dark:text-pink-200">Dashboard</h1>
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 dark:bg-gray-700 hover:bg-pink-200 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-6 w-6 text-yellow-500" />
          ) : (
            <Moon className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pink-700 dark:text-pink-300 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-pink-600 dark:text-pink-400 mt-2">
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
        <Card title="Recently Added Books" className="bg-green-100/80 dark:bg-gray-800/50 border-green-200 dark:border-gray-700">
          {books && books.length > 0 ? (
            <ul className="space-y-2">
              {books.slice(-5).reverse().map((book) => (
                <li key={book.id} className="flex justify-between items-center py-2 border-b border-pink-100 dark:border-gray-700 last:border-0">
                  <span className="font-medium text-pink-800 dark:text-pink-200">{book.title}</span>
                  <span className="text-sm text-pink-600 dark:text-pink-400">{book.author}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-pink-400 dark:text-pink-500">No books added yet</p>
          )}
        </Card>

        <Card title="Active Loans" className="bg-green-100/80 dark:bg-gray-800/50 border-green-200 dark:border-gray-700">
          {activeLoans.length > 0 ? (
            <ul className="space-y-2">
              {activeLoans.slice(0, 5).map((loan) => (
                <li key={loan.id} className="flex justify-between items-center py-2 border-b border-green-100 dark:border-gray-700 last:border-0">
                  <span className="font-medium text-pink-800 dark:text-pink-200">{loan.bookTitle}</span>
                  <span className="text-sm text-pink-600 dark:text-pink-400">{loan.memberName}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-pink-400 dark:text-pink-500">No active loans</p>
          )}
        </Card>
      </div>
    </div>
  )
}
