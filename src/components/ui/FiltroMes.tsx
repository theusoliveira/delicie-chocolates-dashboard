'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function FiltroMes({ value }: { value: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('mes', e.target.value)
    router.push(`?${params.toString()}`)
  }, [router, searchParams])

  return (
    <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
      <label htmlFor="filtro-mes" className="hidden md:block text-sm text-chocolate-600 font-medium">
        Filtrar por mês:
      </label>
      <input
        id="filtro-mes"
        type="month"
        value={value}
        onChange={handleChange}
        className="input max-w-[160px] md:max-w-[180px] text-sm"
        aria-label="Filtrar por mês"
      />
    </div>
  )
}
