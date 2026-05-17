'use client'

import { useCallback, useTransition } from 'react'
import { deleteVenda, updateStatusVenda } from '@/actions/vendas'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { NovaVendaModal } from '@/components/features/NovaVendaModal'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Venda, Produto } from '@/types'

interface Props {
  vendas: Venda[]
  produtos: Produto[]
}

function StatusBadge({ status }: { status: Venda['status'] }) {
  if (status === 'pago') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
        ✓ Pago
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
      Não pago
    </span>
  )
}

function ToggleStatusButton({ venda }: { venda: Venda }) {
  const [pending, startTransition] = useTransition()

  const toggle = useCallback(() => {
    const novoStatus = venda.status === 'pendente' ? 'pago' : 'pendente'
    startTransition(() => { updateStatusVenda(venda.id, novoStatus) })
  }, [venda.id, venda.status])

  if (venda.status === 'pago') {
    return (
      <button
        onClick={toggle}
        disabled={pending}
        title="Marcar como pendente"
        className="text-xs text-chocolate-400 hover:text-amber-600 disabled:opacity-50 transition-colors"
      >
        {pending ? '…' : 'Desfazer'}
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      title="Marcar como pago"
      className="text-xs font-medium text-green-600 hover:text-green-800 disabled:opacity-50 transition-colors whitespace-nowrap"
    >
      {pending ? '…' : '✓ Marcar como pago'}
    </button>
  )
}

export function TabelaVendas({ vendas, produtos }: Props) {
  return (
    <>
      <div className="md:hidden divide-y divide-chocolate-50">
        {vendas.map((v) => <VendaCard key={v.id} venda={v} produtos={produtos} />)}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-chocolate-50 border-b border-chocolate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Data venda</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Cliente</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Produto</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Qtd</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Entrega</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Total</th>
              <th className="px-5 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-chocolate-50">
            {vendas.map((v) => <VendaRow key={v.id} venda={v} produtos={produtos} />)}
          </tbody>
        </table>
      </div>
    </>
  )
}

function VendaCard({ venda, produtos }: { venda: Venda; produtos: Produto[] }) {
  const handleDelete = useCallback(() => deleteVenda(venda.id), [venda.id])
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-chocolate-900 truncate">{venda.cliente ?? venda.descricao}</p>
          <p className="text-xs text-chocolate-400">{venda.produto?.nome ?? '—'}</p>
        </div>
        <span className="font-bold text-green-600 whitespace-nowrap">{formatCurrency(venda.valor_total)}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-chocolate-500">
        <span>🗓 Venda: {formatDate(venda.data)}</span>
        {venda.data_entrega && <span>📦 Entrega: {formatDate(venda.data_entrega)}</span>}
        <span>× {venda.quantidade}</span>
      </div>
      {venda.observacoes && <p className="text-xs text-chocolate-400 italic">{venda.observacoes}</p>}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <StatusBadge status={venda.status} />
          <ToggleStatusButton venda={venda} />
        </div>
        <div className="flex items-center gap-1">
          <NovaVendaModal produtos={produtos} venda={venda} />
          <DeleteButton onDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}

function VendaRow({ venda, produtos }: { venda: Venda; produtos: Produto[] }) {
  const handleDelete = useCallback(() => deleteVenda(venda.id), [venda.id])
  return (
    <tr className="hover:bg-chocolate-50/50 transition-colors">
      <td className="px-5 py-3 text-chocolate-500 whitespace-nowrap">{formatDate(venda.data)}</td>
      <td className="px-5 py-3 font-medium text-chocolate-900">
        {venda.cliente ?? venda.descricao}
        {venda.observacoes && <p className="text-xs text-chocolate-400 italic font-normal">{venda.observacoes}</p>}
      </td>
      <td className="px-5 py-3 text-chocolate-600">{venda.produto?.nome ?? <span className="text-chocolate-300">—</span>}</td>
      <td className="px-5 py-3 text-chocolate-600">{venda.quantidade}</td>
      <td className="px-5 py-3 text-chocolate-500 whitespace-nowrap">
        {venda.data_entrega ? formatDate(venda.data_entrega) : <span className="text-chocolate-300">—</span>}
      </td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-2">
          <StatusBadge status={venda.status} />
          <ToggleStatusButton venda={venda} />
        </div>
      </td>
      <td className="px-5 py-3 text-right font-semibold text-green-600">{formatCurrency(venda.valor_total)}</td>
      <td className="px-5 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <NovaVendaModal produtos={produtos} venda={venda} />
          <DeleteButton onDelete={handleDelete} />
        </div>
      </td>
    </tr>
  )
}