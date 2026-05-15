import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 bg-chocolate-100 rounded-full flex items-center justify-center mb-4">
        <Icon size={24} className="text-chocolate-400" />
      </div>
      <h3 className="text-base font-semibold text-chocolate-800 mb-1">{title}</h3>
      <p className="text-sm text-chocolate-400 max-w-xs">{description}</p>
    </div>
  )
}
