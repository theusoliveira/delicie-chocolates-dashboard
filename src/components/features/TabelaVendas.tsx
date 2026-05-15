'use client'

import { useCallback } from 'react'
import { deleteVenda } from '@/actions/vendas'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Venda } from '@/types'

interface Props { vendas: Venda[] }

export function TabelaVendas({ vendas }: Props) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="md:hidden divide-y divide-chocolate-50">
        {vendas.map((v) => (
          <VendaCard key={v.id} venda={v} />
        ))}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-chocolate-50 border-b border-chocolate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Data venda</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Cliente</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Produto</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Qtd</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Entrega</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Total</th>
              <th className="px-5 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-chocolate-50">
            {vendas.map((v) => (
              <VendaRow key={v.id} venda={v} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function VendaCard({ venda: v }: { venda: Venda }) {
  const handleDelete = useCallback(() => deleteVenda(v.id), [v.id])
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-chocolate-900 truncate">{v.cliente ?? v.descricao}</p>
          <p className="text-xs text-chocolate-400">{v.produto?.nome ?? '—'}</p>
        </div>
        <span className="font-bold text-green-600 whitespace-nowrap">{formatCurrency(v.valor_total)}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-chocolate-500">
        <span>🗓 Venda: {formatDate(v.data)}</span>
        {v.data_entrega && <span>📦 Entrega: {formatDate(v.data_entrega)}</span>}
        <span>× {v.quantidade}</span>
      </div>
      {v.observacoes && <p className="text-xs text-chocolate-400 italic">{v.observacoes}</p>}
      <div className="pt-1">
        <DeleteButton onDelete={handleDelete} />
      </div>
    </div>
  )
}

function VendaRow({ venda: v }: { venda: Venda }) {
  const handleDelete = useCallback(() => deleteVenda(v.id), [v.id])
  return (
    <tr className="hover:bg-chocolate-50/50 transition-colors">
      <td className="px-5 py-3 text-chocolate-500 whitespace-nowrap">{formatDate(v.data)}</td>
      <td className="px-5 py-3 font-medium text-chocolate-900">
        {v.cliente ?? v.descricao}
        {v.observacoes && <p className="text-xs text-chocolate-400 italic font-normal">{v.observacoes}</p>}
      </td>
      <td className="px-5 py-3 text-chocolate-600">{v.produto?.nome ?? <span className="text-chocolate-300">—</span>}</td>
      <td className="px-5 py-3 text-chocolate-600">{v.quantidade}</td>
      <td className="px-5 py-3 text-chocolate-500 whitespace-nowrap">
        {v.data_entrega ? formatDate(v.data_entrega) : <span className="text-chocolate-300">—</span>}
      </td>
      <td className="px-5 py-3 text-right font-semibold text-green-600">{formatCurrency(v.valor_total)}</td>
      <td className="px-5 py-3 text-right"><DeleteButton onDelete={handleDelete} /></td>
    </tr>
  )
}
