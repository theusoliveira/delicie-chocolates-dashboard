'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import type { TipoGasto } from '@/types'

export async function createGasto(formData: FormData): Promise<{ error?: string }> {
  const descricao = formData.get('descricao') as string
  const categoria_id = (formData.get('categoria_id') as string) || null
  const valor = parseFloat(formData.get('valor') as string)
  const data = formData.get('data') as string
  const tipo = (formData.get('tipo') as TipoGasto) || 'variavel'
  const observacoes = (formData.get('observacoes') as string) || null

  if (!descricao?.trim() || !valor || isNaN(valor) || !data) {
    return { error: 'Preencha os campos obrigatórios.' }
  }

  const { error } = await supabase.from('gastos').insert({
    descricao: descricao.trim(),
    categoria_id,
    valor,
    data,
    tipo,
    observacoes,
  })

  if (error) return { error: error.message }

  revalidatePath('/gastos')
  revalidatePath('/dashboard')
  return {}
}

export async function deleteGasto(id: string): Promise<{ error?: string }> {
  if (!id) return { error: 'ID inválido.' }

  const { error } = await supabase.from('gastos').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/gastos')
  revalidatePath('/dashboard')
  return {}
}

export async function updateGasto(id: string, formData: FormData): Promise<{ error?: string }> {
  const descricao = formData.get('descricao') as string
  const categoria_id = (formData.get('categoria_id') as string) || null
  const valor = parseFloat(formData.get('valor') as string)
  const data = formData.get('data') as string
  const tipo = (formData.get('tipo') as TipoGasto) || 'variavel'
  const observacoes = (formData.get('observacoes') as string) || null

  if (!descricao?.trim() || !valor || isNaN(valor) || !data) {
    return { error: 'Preencha os campos obrigatórios.' }
  }

  const { error } = await supabase.from('gastos').update({
    descricao: descricao.trim(),
    categoria_id,
    valor,
    data,
    tipo,
    observacoes,
  }).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/gastos')
  revalidatePath('/dashboard')
  return {}
}