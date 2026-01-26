import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export default function Card({ children, className = '', title }: CardProps) {
  const hasBg = className.includes('bg-')
  const defaultBg = hasBg ? '' : 'bg-white/80 dark:bg-gray-800/80'

  return (
    <div className={`${defaultBg} backdrop-blur-sm rounded-xl shadow-lg shadow-pink-100 dark:shadow-gray-900 border border-pink-100 dark:border-gray-700 p-6 transition-colors duration-200 ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-4 text-pink-700 dark:text-pink-300">{title}</h3>}
      {children}
    </div>
  )
}
