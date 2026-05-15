'use client'

import { useState, useRef, useCallback } from 'react'
import { Plus, Pencil } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { createGasto, updateGasto } from '@/actions/gastos'
import { todayISO, TIPO_LABELS } from '@/lib/utils'
import type { CategoriaGasto, Gasto } from '@/types'

interface Props {
  categorias: CategoriaGasto[]
  gasto?: Gasto   // se passado, abre em modo edição
}

export function NovoGastoModal({ categorias, gasto }: Props) {
  const isEditing = !!gasto
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

    const result = isEditing
      ? await updateGasto(gasto.id, new FormData(e.currentTarget))
      : await createGasto(new FormData(e.currentTarget))

    setLoading(false)
    if (result.error) { setError(result.error); return }
    handleClose()
  }

  return (
    <>
      {isEditing ? (
        <button
          onClick={() => setOpen(true)}
          title="Editar gasto"
          className="p-1.5 rounded-md text-chocolate-400 hover:text-chocolate-700 hover:bg-chocolate-100 transition-colors"
        >
          <Pencil size={15} />
        </button>
      ) : (
        <button onClick={() => setOpen(true)} className="btn-primary">
          <Plus size={16} aria-hidden="true" />
          Novo Gasto
        </button>
      )}

      <Modal open={open} onClose={handleClose} title={isEditing ? 'Editar Gasto' : 'Novo Gasto'}>
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4 [&_.label]:text-left [&_.label]:block">
          <div>
            <label className="label" htmlFor="gasto-desc">Descrição *</label>
            <input
              id="gasto-desc"
              name="descricao"
              required
              placeholder="Ex: Compra de cacau"
              defaultValue={gasto?.descricao ?? ''}
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="gasto-cat">Categoria</label>
              <select id="gasto-cat" name="categoria_id" defaultValue={gasto?.categoria_id ?? ''} className="input">
                <option value="">— Selecione —</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="gasto-tipo">Tipo</label>
              <select id="gasto-tipo" name="tipo" defaultValue={gasto?.tipo ?? 'variavel'} className="input">
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
                defaultValue={gasto?.valor ?? ''}
                className="input"
              />
            </div>
            <div>
              <label className="label" htmlFor="gasto-data">Data *</label>
              <input
                id="gasto-data"
                name="data"
                type="date"
                required
                defaultValue={gasto?.data ?? todayISO()}
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="gasto-obs">Observações</label>
            <textarea
              id="gasto-obs"
              name="observacoes"
              rows={2}
              placeholder="Opcional…"
              defaultValue={gasto?.observacoes ?? ''}
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
              {loading ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Registrar Gasto'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}