'use client'

import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import type { Venda, Gasto } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface Props {
  vendas: Venda[]
  gastos: Gasto[]
}

interface ChartEntry {
  dia: string
  diaLabel: string
  vendas: number
  gastos: number
}

function buildChartData(vendas: Venda[], gastos: Gasto[]): ChartEntry[] {
  const map = new Map<string, ChartEntry>()

  for (const v of vendas) {
    const entry = map.get(v.data) ?? { dia: v.data, diaLabel: v.data.slice(5).replace('-', '/'), vendas: 0, gastos: 0 }
    entry.vendas += v.valor_total
    map.set(v.data, entry)
  }

  for (const g of gastos) {
    const entry = map.get(g.data) ?? { dia: g.data, diaLabel: g.data.slice(5).replace('-', '/'), vendas: 0, gastos: 0 }
    entry.gastos += g.valor
    map.set(g.data, entry)
  }

  return Array.from(map.values()).sort((a, b) => a.dia.localeCompare(b.dia))
}

export function GraficoDashboard({ vendas, gastos }: Props) {
  // useMemo evita recalcular o buildChartData em cada re-render
  const data = useMemo(() => buildChartData(vendas, gastos), [vendas, gastos])

  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-chocolate-300 text-sm">
        Sem dados para exibir neste período
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f2d8a8" />
        <XAxis dataKey="diaLabel" tick={{ fontSize: 11, fill: '#92400e' }} />
        <YAxis tickFormatter={(v: number) => `R$${v}`} tick={{ fontSize: 11, fill: '#92400e' }} width={56} />
        <Tooltip formatter={(v: number) => formatCurrency(v)} labelStyle={{ color: '#3d2010' }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="vendas" name="Vendas" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={40} />
        <Bar dataKey="gastos" name="Gastos" fill="#dc2626" radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  )
}
