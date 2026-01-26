import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Users, ClipboardList, LayoutDashboard } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/books', label: 'Books', icon: BookOpen },
    { path: '/members', label: 'Members', icon: Users },
    { path: '/loans', label: 'Loans', icon: ClipboardList },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <nav className="bg-green-100/80 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg shadow-pink-100 dark:shadow-gray-900 border-b border-pink-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <BookOpen className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                <span className="ml-2 text-xl font-bold text-pink-700 dark:text-pink-300">
                  BookPulse
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'border-pink-500 text-pink-700 dark:border-pink-400 dark:text-pink-300'
                          : 'border-transparent text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-200 hover:border-pink-300 dark:hover:border-pink-500'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">{children}</div>
      </main>
    </div>
  )
}
