'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import type { Canal, StatusVenda, DescontoTipo } from '@/types'

export async function createVenda(formData: FormData): Promise<{ error?: string }> {
  const descricao = formData.get('descricao') as string
  const produto_id = formData.get('produto_id') as string
  const quantidade = Math.max(1, parseInt(formData.get('quantidade') as string) || 1)
  const valor_total = parseFloat(formData.get('valor_total') as string)
  const data = formData.get('data') as string
  const data_entrega = (formData.get('data_entrega') as string) || null
  const observacoes = (formData.get('observacoes') as string) || null
  const canal = (formData.get('canal') as Canal) || 'loja'
  const desconto_tipo = (formData.get('desconto_tipo') as DescontoTipo) || 'percentual'
  const desconto_valor = parseFloat(formData.get('desconto_valor') as string) || 0

  if (!descricao?.trim() || !produto_id || !valor_total || !data) {
    return { error: 'Preencha os campos obrigatórios.' }
  }

  const { error } = await supabase.from('vendas').insert({
    descricao: descricao.trim(),
    cliente: descricao.trim(),
    produto_id,
    quantidade,
    valor_total,
    data,
    canal,
    data_entrega,
    observacoes,
    status: 'pendente',
    desconto_tipo,
    desconto_valor,
  })

  if (error) return { error: error.message }

  revalidatePath('/vendas')
  revalidatePath('/dashboard')
  return {}
}

export async function updateVenda(id: string, formData: FormData): Promise<{ error?: string }> {
  const descricao = formData.get('descricao') as string
  const produto_id = formData.get('produto_id') as string
  const quantidade = Math.max(1, parseInt(formData.get('quantidade') as string) || 1)
  const valor_total = parseFloat(formData.get('valor_total') as string)
  const data = formData.get('data') as string
  const data_entrega = (formData.get('data_entrega') as string) || null
  const observacoes = (formData.get('observacoes') as string) || null
  const canal = (formData.get('canal') as Canal) || 'loja'
  const desconto_tipo = (formData.get('desconto_tipo') as DescontoTipo) || 'percentual'
  const desconto_valor = parseFloat(formData.get('desconto_valor') as string) || 0

  if (!descricao?.trim() || !produto_id || !valor_total || !data) {
    return { error: 'Preencha os campos obrigatórios.' }
  }

  const { error } = await supabase.from('vendas').update({
    descricao: descricao.trim(),
    cliente: descricao.trim(),
    produto_id,
    quantidade,
    valor_total,
    data,
    canal,
    data_entrega,
    observacoes,
    desconto_tipo,
    desconto_valor,
  }).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/vendas')
  revalidatePath('/dashboard')
  return {}
}

export async function updateStatusVenda(
  id: string,
  status: StatusVenda,
): Promise<{ error?: string }> {
  if (!id) return { error: 'ID inválido.' }

  const { error } = await supabase
    .from('vendas')
    .update({ status })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/vendas')
  revalidatePath('/dashboard')
  return {}
}

export async function deleteVenda(id: string): Promise<{ error?: string }> {
  if (!id) return { error: 'ID inválido.' }

  const { error } = await supabase.from('vendas').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/vendas')
  revalidatePath('/dashboard')
  return {}
}