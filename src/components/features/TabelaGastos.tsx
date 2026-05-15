'use client'

import { useCallback } from 'react'
import { deleteGasto } from '@/actions/gastos'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { formatCurrency, formatDate, TIPO_LABELS } from '@/lib/utils'
import type { Gasto } from '@/types'

interface Props { gastos: Gasto[] }

export function TabelaGastos({ gastos }: Props) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="md:hidden divide-y divide-chocolate-50">
        {gastos.map((g) => (
          <GastoCard key={g.id} gasto={g} />
        ))}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-chocolate-50 border-b border-chocolate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Data</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Descrição</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Categoria</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Tipo</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Valor</th>
              <th className="px-5 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-chocolate-50">
            {gastos.map((g) => (
              <GastoRow key={g.id} gasto={g} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function CategoriaBadge({ categoria }: { categoria: NonNullable<Gasto['categoria']> }) {
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${categoria.cor}18`, color: categoria.cor }}
    >
      {categoria.nome}
    </span>
  )
}

function TipoBadge({ tipo }: { tipo: Gasto['tipo'] }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
      tipo === 'fixo' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
    }`}>
      {TIPO_LABELS[tipo]}
    </span>
  )
}

function GastoCard({ gasto: g }: { gasto: Gasto }) {
  const handleDelete = useCallback(() => deleteGasto(g.id), [g.id])
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-chocolate-900 truncate">{g.descricao}</p>
        <span className="font-bold text-red-500 whitespace-nowrap">{formatCurrency(g.valor)}</span>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-chocolate-500 items-center">
        <span>🗓 {formatDate(g.data)}</span>
        {g.categoria && <CategoriaBadge categoria={g.categoria} />}
        <TipoBadge tipo={g.tipo} />
      </div>
      {g.observacoes && <p className="text-xs text-chocolate-400 italic">{g.observacoes}</p>}
      <div className="pt-1">
        <DeleteButton onDelete={handleDelete} />
      </div>
    </div>
  )
}

function GastoRow({ gasto: g }: { gasto: Gasto }) {
  const handleDelete = useCallback(() => deleteGasto(g.id), [g.id])
  return (
    <tr className="hover:bg-chocolate-50/50 transition-colors">
      <td className="px-5 py-3 text-chocolate-500 whitespace-nowrap">{formatDate(g.data)}</td>
      <td className="px-5 py-3">
        <p className="font-medium text-chocolate-900">{g.descricao}</p>
        {g.observacoes && <p className="text-xs text-chocolate-400 italic">{g.observacoes}</p>}
      </td>
      <td className="px-5 py-3">
        {g.categoria
          ? <CategoriaBadge categoria={g.categoria} />
          : <span className="text-chocolate-300 text-xs">—</span>}
      </td>
      <td className="px-5 py-3"><TipoBadge tipo={g.tipo} /></td>
      <td className="px-5 py-3 text-right font-semibold text-red-500">{formatCurrency(g.valor)}</td>
      <td className="px-5 py-3 text-right"><DeleteButton onDelete={handleDelete} /></td>
    </tr>
  )
}
