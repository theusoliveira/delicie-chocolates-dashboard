'use client'

import { useState, useCallback } from 'react'
import { Pencil } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { deleteProduto, updateProduto } from '@/actions/produtos'
import { DeleteButton } from '@/components/ui/DeleteButton'
import { formatCurrency } from '@/lib/utils'
import type { Produto } from '@/types'

interface Props {
  produtos: Produto[]
}

function EditarProdutoForm({ produto, onClose }: { produto: Produto; onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    const result = await updateProduto(produto.id, new FormData(e.currentTarget))
    setLoading(false)
    if (result.error) { setError(result.error); return }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <label className="label" htmlFor="edit-nome">Descrição *</label>
        <input id="edit-nome" name="nome" required defaultValue={produto.nome} className="input" />
      </div>

      <div>
        <label className="label" htmlFor="edit-preco">Valor (R$) *</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-chocolate-400 text-sm font-medium select-none">R$</span>
          <input
            id="edit-preco"
            name="preco_unitario"
            type="number"
            step="0.01"
            min="0.01"
            required
            defaultValue={produto.preco_unitario}
            className="input pl-9"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="edit-obs">Observação</label>
        <textarea
          id="edit-obs"
          name="observacoes"
          rows={3}
          defaultValue={produto.observacoes ?? ''}
          placeholder="Ingredientes, detalhes, peso… (opcional)"
          className="input resize-none"
        />
      </div>

      {error && <p role="alert" className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
          {loading ? 'Salvando…' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  )
}

export function TabelaProdutos({ produtos }: Props) {
  const [editando, setEditando] = useState<Produto | null>(null)
  const handleClose = useCallback(() => setEditando(null), [])

  return (
    <>
      <Modal open={editando !== null} onClose={handleClose} title="Editar Produto">
        {editando && <EditarProdutoForm produto={editando} onClose={handleClose} />}
      </Modal>

      {/* Mobile: cards */}
      <div className="md:hidden divide-y divide-chocolate-50">
        {produtos.map((p) => (
          <div key={p.id} className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-chocolate-900">{p.nome}</p>
              <span className="font-bold text-chocolate-800 whitespace-nowrap">{formatCurrency(p.preco_unitario)}</span>
            </div>
            {p.observacoes && <p className="text-xs text-chocolate-500">{p.observacoes}</p>}
            <div className="flex gap-2 pt-1">
              <button onClick={() => setEditando(p)} className="btn-secondary !px-3 !py-1.5 !text-sm">
                <Pencil size={13} aria-hidden="true" /> Editar
              </button>
              <DeleteButton onDelete={() => deleteProduto(p.id)} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-chocolate-50 border-b border-chocolate-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Descrição</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Observação</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-chocolate-600 uppercase tracking-wide">Valor</th>
              <th className="px-5 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-chocolate-50">
            {produtos.map((p) => (
              <tr key={p.id} className="hover:bg-chocolate-50/50 transition-colors">
                <td className="px-5 py-3 font-medium text-chocolate-900">{p.nome}</td>
                <td className="px-5 py-3 text-chocolate-500 text-sm">
                  {p.observacoes || <span className="text-chocolate-300">—</span>}
                </td>
                <td className="px-5 py-3 text-right font-semibold text-chocolate-800">{formatCurrency(p.preco_unitario)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditando(p)}
                      className="btn-secondary !px-3 !py-1.5 !text-sm"
                      aria-label={`Editar ${p.nome}`}
                    >
                      <Pencil size={13} aria-hidden="true" />
                    </button>
                    <DeleteButton onDelete={() => deleteProduto(p.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
