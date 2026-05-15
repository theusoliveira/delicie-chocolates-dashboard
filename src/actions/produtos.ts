'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function createProduto(formData: FormData): Promise<{ error?: string }> {
  const nome = formData.get('nome') as string
  const preco_unitario = parseFloat(formData.get('preco_unitario') as string)
  const observacoes = (formData.get('observacoes') as string) || null

  if (!nome?.trim() || !preco_unitario || isNaN(preco_unitario)) {
    return { error: 'Preencha os campos obrigatórios.' }
  }

  const { error } = await supabase.from('produtos').insert({
    nome: nome.trim(),
    preco_unitario,
    observacoes,
  })

  if (error) return { error: error.message }
  revalidatePath('/produtos')
  return {}
}

export async function updateProduto(id: string, formData: FormData): Promise<{ error?: string }> {
  const nome = formData.get('nome') as string
  const preco_unitario = parseFloat(formData.get('preco_unitario') as string)
  const observacoes = (formData.get('observacoes') as string) || null

  if (!nome?.trim() || !preco_unitario || isNaN(preco_unitario)) {
    return { error: 'Preencha os campos obrigatórios.' }
  }

  const { error } = await supabase
    .from('produtos')
    .update({ nome: nome.trim(), preco_unitario, observacoes })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/produtos')
  return {}
}

export async function deleteProduto(id: string): Promise<{ error?: string }> {
  if (!id) return { error: 'ID inválido.' }

  const { error } = await supabase.from('produtos').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/produtos')
  return {}
}
