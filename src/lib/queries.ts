import { cache } from 'react'
import { supabase } from '@/lib/supabase'
import type { Venda, Gasto, Produto, CategoriaGasto } from '@/types'

// Funções de leitura com react.cache() para deduplicação por request
// Separadas das actions (que são mutações) seguindo a convenção Next.js 15

function getMesRange(mes: string): { start: string; end: string } {
  const [year, month] = mes.split('-')
  const start = `${year}-${month}-01`
  const end = new Date(Number(year), Number(month), 0).toISOString().split('T')[0]
  return { start, end }
}

export const getVendas = cache(async (mes?: string): Promise<Venda[]> => {
  let query = supabase
    .from('vendas')
    .select('*, produto:produtos(id, nome, preco_unitario, observacoes, ativo, created_at)')
    .order('data', { ascending: false })
    .order('created_at', { ascending: false })

  if (mes) {
    const { start, end } = getMesRange(mes)
    query = query.gte('data', start).lte('data', end)
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data ?? []) as Venda[]
})

export const getGastos = cache(async (mes?: string): Promise<Gasto[]> => {
  let query = supabase
    .from('gastos')
    .select('*, categoria:categorias_gasto(id, nome, cor, created_at)')
    .order('data', { ascending: false })
    .order('created_at', { ascending: false })

  if (mes) {
    const { start, end } = getMesRange(mes)
    query = query.gte('data', start).lte('data', end)
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data ?? []) as Gasto[]
})

export const getProdutos = cache(async (): Promise<Produto[]> => {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('ativo', true)
    .order('nome')

  if (error) throw new Error(error.message)
  return (data ?? []) as Produto[]
})

export const getCategorias = cache(async (): Promise<CategoriaGasto[]> => {
  const { data, error } = await supabase
    .from('categorias_gasto')
    .select('*')
    .order('nome')

  if (error) throw new Error(error.message)
  return (data ?? []) as CategoriaGasto[]
})
