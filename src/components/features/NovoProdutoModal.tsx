'use client'

import { useState, useRef, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { createProduto } from '@/actions/produtos'

export function NovoProdutoModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const formRef = useRef<HTMLFormElement>(null)

  const handleClose = useCallback(() => {
    formRef.current?.reset()
    setError(undefined)
    setOpen(false)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    const result = await createProduto(new FormData(e.currentTarget))
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
        Novo Produto
      </button>

      <Modal open={open} onClose={handleClose} title="Novo Produto">
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label" htmlFor="prod-nome">Descrição *</label>
            <input id="prod-nome" name="nome" required placeholder="Ex: Caixa de Bombons 250g" className="input" />
          </div>

          <div>
            <label className="label" htmlFor="prod-preco">Valor (R$) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-chocolate-400 text-sm font-medium select-none">R$</span>
              <input
                id="prod-preco"
                name="preco_unitario"
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="0,00"
                className="input pl-9"
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="prod-obs">Observação</label>
            <textarea
              id="prod-obs"
              name="observacoes"
              rows={3}
              placeholder="Ingredientes, detalhes, peso… (opcional)"
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
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? 'Salvando…' : 'Cadastrar Produto'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
