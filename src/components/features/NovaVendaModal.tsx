'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Plus, Pencil } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { createVenda, updateVenda } from '@/actions/vendas'
import { todayISO, formatCurrency } from '@/lib/utils'
import type { Produto, Venda } from '@/types'

interface Props {
  produtos: Produto[]
  venda?: Venda        // se passado, abre em modo edição
  trigger?: 'button'   // reservado para uso externo
}

export function NovaVendaModal({ produtos, venda }: Props) {
  const isEditing = !!venda
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [quantidade, setQuantidade] = useState(venda?.quantidade ?? 1)
  const [precoUnit, setPrecoUnit] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  // Ao abrir em modo edição, calcula o preço unitário a partir do total existente
  useEffect(() => {
    if (open && venda) {
      setQuantidade(venda.quantidade)
      setPrecoUnit(venda.valor_total / venda.quantidade)
    }
  }, [open, venda])

  const valorTotal = precoUnit * quantidade

  function handleProdutoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const produto = produtos.find((p) => p.id === e.target.value)
    setPrecoUnit(produto?.preco_unitario ?? 0)
  }

  const handleClose = useCallback(() => {
    formRef.current?.reset()
    setQuantidade(venda?.quantidade ?? 1)
    setPrecoUnit(venda ? venda.valor_total / venda.quantidade : 0)
    setError(undefined)
    setOpen(false)
  }, [venda])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    const fd = new FormData(e.currentTarget)
    fd.set('valor_total', valorTotal.toFixed(2))

    const result = isEditing
      ? await updateVenda(venda.id, fd)
      : await createVenda(fd)

    setLoading(false)
    if (result.error) { setError(result.error); return }
    handleClose()
  }

  return (
    <>
      {isEditing ? (
        <button
          onClick={() => setOpen(true)}
          title="Editar venda"
          className="p-1.5 rounded-md text-chocolate-400 hover:text-chocolate-700 hover:bg-chocolate-100 transition-colors"
        >
          <Pencil size={15} />
        </button>
      ) : (
        <button onClick={() => setOpen(true)} className="btn-primary">
          <Plus size={16} aria-hidden="true" />
          Nova Venda
        </button>
      )}

      <Modal open={open} onClose={handleClose} title={isEditing ? 'Editar Venda' : 'Nova Venda'}>
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4 [&_.label]:text-left [&_.label]:block">
          <div>
            <label className="label" htmlFor="venda-data">Data da venda *</label>
            <input
              id="venda-data"
              name="data"
              type="date"
              required
              defaultValue={venda?.data ?? todayISO()}
              className="input"
            />
          </div>

          <div>
            <label className="label" htmlFor="venda-cliente">Cliente *</label>
            <input
              id="venda-cliente"
              name="descricao"
              required
              placeholder="Nome do cliente"
              defaultValue={venda?.cliente ?? venda?.descricao ?? ''}
              className="input"
            />
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
              <select
                id="venda-produto"
                name="produto_id"
                required
                defaultValue={venda?.produto_id ?? ''}
                onChange={handleProdutoChange}
                className="input"
              >
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
                value={quantidade}
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
            <input
              id="venda-entrega"
              name="data_entrega"
              type="date"
              defaultValue={venda?.data_entrega ?? ''}
              className="input"
            />
          </div>

          <div>
            <label className="label" htmlFor="venda-obs">Observações</label>
            <textarea
              id="venda-obs"
              name="observacoes"
              rows={3}
              placeholder="Opcional…"
              defaultValue={venda?.observacoes ?? ''}
              className="input resize-none"
            />
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
              {loading ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Registrar Venda'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}