'use client'

import { useState, useCallback } from 'react'
import { Trash2 } from 'lucide-react'

interface DeleteButtonProps {
  onDelete: () => Promise<{ error?: string }>
  label?: string
}

export function DeleteButton({ onDelete, label = '' }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(() => {
    setConfirming(true)
  }, [])

  const handleConfirm = useCallback(async () => {
    setLoading(true)
    setConfirming(false)
    const result = await onDelete()
    if (result.error) {
      alert(result.error)
      setLoading(false)
    }
  }, [onDelete])

  const handleCancel = useCallback(() => {
    setConfirming(false)
  }, [])

  return (
    <>
      {confirming && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleCancel}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 size={18} className="text-red-500" />
              </div>
              <div>
                <h2 id="confirm-title" className="font-semibold text-chocolate-900">
                  Confirmar exclusão
                </h2>
                <p className="text-sm text-chocolate-500 mt-0.5">
                  Esta ação não pode ser desfeita.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={handleCancel}
                className="btn-secondary flex-1 justify-center"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="btn-danger flex-1 justify-center"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={loading}
        aria-label="Excluir"
        className="btn-danger"
      >
        <Trash2 size={13} aria-hidden="true" />
        {loading ? 'Excluindo…' : label}
      </button>
    </>
  )
}