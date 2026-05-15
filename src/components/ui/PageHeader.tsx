interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <header className="flex items-start justify-between mb-6 gap-3">
      <div className="min-w-0">
        <h1 className="text-xl md:text-2xl font-bold text-chocolate-900 truncate">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-chocolate-500 mt-1 leading-snug">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </header>
  )
}
