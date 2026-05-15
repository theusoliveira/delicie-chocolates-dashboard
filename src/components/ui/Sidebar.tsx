'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Receipt, Package, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LogoutButton } from './LogoutButton'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/produtos',  label: 'Produtos',  icon: Package },
  { href: '/vendas',    label: 'Vendas',    icon: ShoppingBag },
  { href: '/gastos',    label: 'Gastos',    icon: Receipt },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-chocolate-900 text-white flex-col z-10"
      aria-label="Sidebar de navegação"
    >
      <div className="p-6 border-b border-chocolate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-chocolate-400 rounded-full flex items-center justify-center text-xl" aria-hidden="true">🍫</div>
          <div>
            <h1 className="font-display text-lg leading-tight">Deliciê</h1>
            <p className="text-chocolate-300 text-xs">Chocolates</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1" aria-label="Menu principal">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150',
                active ? 'bg-chocolate-700 text-white' : 'text-chocolate-300 hover:bg-chocolate-800 hover:text-white'
              )}
            >
              <Icon size={18} aria-hidden="true" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} className="opacity-60" aria-hidden="true" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-chocolate-700 space-y-2">
        <LogoutButton />
        <p className="text-chocolate-500 text-xs text-center">Gestão Financeira v1.0</p>
      </div>
    </aside>
  )
}
