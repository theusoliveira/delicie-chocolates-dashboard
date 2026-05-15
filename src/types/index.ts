export type Canal = 'loja' | 'delivery' | 'encomenda' | 'outro'
export type TipoGasto = 'fixo' | 'variavel'
export type StatusVenda = 'pendente' | 'pago'

export interface Produto {
  id: string
  nome: string
  preco_unitario: number
  observacoes: string | null
  ativo: boolean
  created_at: string
}

export interface CategoriaGasto {
  id: string
  nome: string
  cor: string
  created_at: string
}

export interface Venda {
  id: string
  descricao: string
  cliente: string | null
  produto_id: string | null
  quantidade: number
  valor_total: number
  data: string
  data_entrega: string | null
  canal: Canal
  status: StatusVenda   // ← NOVO
  observacoes: string | null
  created_at: string
  produto?: Produto
}

export interface Gasto {
  id: string
  descricao: string
  categoria_id: string | null
  valor: number
  data: string
  tipo: TipoGasto
  observacoes: string | null
  created_at: string
  categoria?: CategoriaGasto
}

export interface ResumoFinanceiro {
  totalVendas: number
  totalGastos: number
  lucro: number
  qtdVendas: number
  qtdGastos: number
}
