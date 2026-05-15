'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Receipt, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/produtos',  label: 'Produtos',  icon: Package },
  { href: '/vendas',    label: 'Vendas',    icon: ShoppingBag },
  { href: '/gastos',    label: 'Gastos',    icon: Receipt },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-chocolate-100 flex md:hidden z-40 safe-area-bottom"
      aria-label="Navegação principal"
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors',
              active ? 'text-chocolate-700' : 'text-chocolate-400'
            )}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
