import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export default function Card({ children, className = '', title }: CardProps) {
  const hasBg = className.includes('bg-')
  const defaultBg = hasBg ? '' : 'bg-white/80'

  return (
    <div className={`${defaultBg} backdrop-blur-sm rounded-xl shadow-lg shadow-pink-100 border border-pink-100 p-6 ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-4 text-pink-700">{title}</h3>}
      {children}
    </div>
  )
}
