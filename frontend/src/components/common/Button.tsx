import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  children: ReactNode
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-green-300 dark:bg-green-600 text-green-800 dark:text-green-100 hover:bg-green-400 dark:hover:bg-green-700',
    secondary: 'bg-secondary dark:bg-gray-600 text-white hover:bg-slate-600 dark:hover:bg-gray-700',
    danger: 'bg-danger dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700',
    success: 'bg-success dark:bg-green-600 text-white hover:bg-green-600 dark:hover:bg-green-700',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
