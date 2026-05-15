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
  const [error, setError] = useState<string>()

  const handleDelete = useCallback(async () => {
    if (!confirming) {
      setConfirming(true)
      // Auto-cancelar confirmação após 3s
      setTimeout(() => setConfirming(false), 3000)
      return
    }
    setLoading(true)
    const result = await onDelete()
    if (result.error) {
      setError(result.error)
      setLoading(false)
      setConfirming(false)
    }
    // Se ok, componente some com o item deletado
  }, [confirming, onDelete])

  if (error) return <span className="text-xs text-red-500">{error}</span>

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      aria-label={confirming ? 'Confirmar exclusão' : 'Excluir'}
      className="btn-danger"
    >
      <Trash2 size={13} aria-hidden="true" />
      {loading ? 'Excluindo…' : confirming ? 'Confirmar?' : label}
    </button>
  )
}
