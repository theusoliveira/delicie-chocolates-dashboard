'use client'

import { useState, useRef, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { createGasto } from '@/actions/gastos'
import { todayISO, TIPO_LABELS } from '@/lib/utils'
import type { CategoriaGasto } from '@/types'

interface Props {
  categorias: CategoriaGasto[]
}

export function NovoGastoModal({ categorias }: Props) {
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
    const result = await createGasto(new FormData(e.currentTarget))
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
        Novo Gasto
      </button>

      <Modal open={open} onClose={handleClose} title="Novo Gasto">
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label" htmlFor="gasto-desc">Descrição *</label>
            <input id="gasto-desc" name="descricao" required placeholder="Ex: Compra de cacau" className="input" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="gasto-cat">Categoria</label>
              <select id="gasto-cat" name="categoria_id" className="input">
                <option value="">— Selecione —</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="gasto-tipo">Tipo</label>
              <select id="gasto-tipo" name="tipo" className="input">
                {Object.entries(TIPO_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="gasto-valor">Valor (R$) *</label>
              <input
                id="gasto-valor"
                name="valor"
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="0,00"
                className="input"
              />
            </div>
            <div>
              <label className="label" htmlFor="gasto-data">Data *</label>
              <input id="gasto-data" name="data" type="date" required defaultValue={todayISO()} className="input" />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="gasto-obs">Observações</label>
            <textarea id="gasto-obs" name="observacoes" rows={2} placeholder="Opcional…" className="input resize-none" />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={handleClose} className="btn-secondary flex-1 justify-center">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? 'Salvando…' : 'Registrar Gasto'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
