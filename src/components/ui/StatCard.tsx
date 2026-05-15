import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  variant?: 'default' | 'success' | 'danger' | 'warning'
}

const variantStyles = {
  default: { card: 'border-chocolate-100', icon: 'bg-chocolate-100 text-chocolate-700', value: 'text-chocolate-900' },
  success: { card: 'border-green-100',     icon: 'bg-green-100 text-green-700',         value: 'text-green-700' },
  danger:  { card: 'border-red-100',       icon: 'bg-red-100 text-red-600',             value: 'text-red-600' },
  warning: { card: 'border-amber-100',     icon: 'bg-amber-100 text-amber-700',         value: 'text-amber-700' },
}

export function StatCard({ title, value, subtitle, icon: Icon, variant = 'default' }: StatCardProps) {
  const styles = variantStyles[variant]
  return (
    <div className={cn('card p-4 md:p-5', styles.card)}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-chocolate-500 font-medium">{title}</p>
          <p className={cn('text-xl md:text-2xl font-bold mt-1 truncate', styles.value)}>{value}</p>
          {subtitle && <p className="text-xs text-chocolate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={cn('w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-2', styles.icon)}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  )
}