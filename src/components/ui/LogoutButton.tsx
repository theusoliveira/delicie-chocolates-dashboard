'use client'

import { useTransition } from 'react'
import { LogOut } from 'lucide-react'
import { logout } from '@/actions/auth'

interface LogoutButtonProps {
  compact?: boolean
}

export function LogoutButton({ compact = false }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(() => logout())
  }

  if (compact) {
    return (
      <button
        onClick={handleLogout}
        disabled={isPending}
        aria-label="Sair"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-chocolate-300 hover:bg-chocolate-800 hover:text-white transition-colors duration-150 disabled:opacity-50"
      >
        <LogOut size={14} aria-hidden="true" />
        {isPending ? 'Saindo…' : 'Sair'}
      </button>
    )
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-chocolate-300 hover:bg-chocolate-800 hover:text-white transition-colors duration-150 disabled:opacity-50"
    >
      <LogOut size={16} aria-hidden="true" />
      {isPending ? 'Saindo…' : 'Sair'}
    </button>
  )
}
