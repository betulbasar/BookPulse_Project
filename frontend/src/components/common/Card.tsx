import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export default function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg shadow-pink-100 border border-pink-100 p-6 ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-4 text-pink-700">{title}</h3>}
      {children}
    </div>
  )
}
