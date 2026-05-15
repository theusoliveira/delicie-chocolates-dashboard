'use client'

import { useState, useRef, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { createVenda } from '@/actions/vendas'
import { todayISO, formatCurrency } from '@/lib/utils'
import type { Produto } from '@/types'

interface Props {
  produtos: Produto[]
}

export function NovaVendaModal({ produtos }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [quantidade, setQuantidade] = useState(1)
  const [precoUnit, setPrecoUnit] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const valorTotal = precoUnit * quantidade

  function handleProdutoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const produto = produtos.find((p) => p.id === e.target.value)
    setPrecoUnit(produto?.preco_unitario ?? 0)
  }

  const handleClose = useCallback(() => {
    formRef.current?.reset()
    setQuantidade(1)
    setPrecoUnit(0)
    setError(undefined)
    setOpen(false)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    const fd = new FormData(e.currentTarget)
    fd.set('valor_total', valorTotal.toFixed(2))
    const result = await createVenda(fd)
    setLoading(false)
    if (result.error) {
      setError(result.error)
      return
    }
    handleClose()
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary">
        <Plus size={16} aria-hidden="true" />
        Nova Venda
      </button>

      <Modal open={open} onClose={handleClose} title="Nova Venda">
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label" htmlFor="venda-data">Data da venda *</label>
            <input id="venda-data" name="data" type="date" required defaultValue={todayISO()} className="input" />
          </div>

          <div>
            <label className="label" htmlFor="venda-cliente">Cliente *</label>
            <input id="venda-cliente" name="descricao" required placeholder="Nome do cliente" className="input" />
          </div>

          <div>
            <label className="label" htmlFor="venda-produto">Produto *</label>
            {produtos.length === 0 ? (
              <p className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                Nenhum produto cadastrado.{' '}
                <a href="/produtos" className="underline font-medium">Cadastre um produto</a>{' '}
                antes de registrar uma venda.
              </p>
            ) : (
              <select id="venda-produto" name="produto_id" required onChange={handleProdutoChange} className="input">
                <option value="">— Selecione um produto —</option>
                {produtos.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="label">Valor unitário</label>
            <div className="input bg-chocolate-50 text-chocolate-600 font-medium select-none">
              {precoUnit > 0
                ? formatCurrency(precoUnit)
                : <span className="text-chocolate-300">Selecione o produto</span>
              }
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="venda-qty">Quantidade *</label>
              <input
                id="venda-qty"
                name="quantidade"
                type="number"
                min="1"
                defaultValue="1"
                required
                onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value) || 1))}
                className="input"
              />
            </div>
            <div>
              <label className="label">Valor total</label>
              <div className="input bg-chocolate-50 text-chocolate-800 font-semibold select-none">
                {valorTotal > 0
                  ? formatCurrency(valorTotal)
                  : <span className="text-chocolate-300 font-normal">—</span>
                }
              </div>
            </div>
          </div>

          <div>
            <label className="label" htmlFor="venda-entrega">Data de entrega</label>
            <input id="venda-entrega" name="data_entrega" type="date" className="input" />
          </div>

          <div>
            <label className="label" htmlFor="venda-obs">Observações</label>
            <textarea id="venda-obs" name="observacoes" rows={3} placeholder="Opcional…" className="input resize-none" />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={handleClose} className="btn-secondary flex-1 justify-center">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || produtos.length === 0}
              className="btn-primary flex-1 justify-center"
            >
              {loading ? 'Salvando…' : 'Registrar Venda'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
