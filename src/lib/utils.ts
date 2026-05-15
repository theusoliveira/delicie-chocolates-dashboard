import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Formatadores memoizados — evitam criar instâncias Intl por chamada
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return dateFormatter.format(new Date(year, month - 1, day))
}

export function getMesAtual(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`)
}

export const CANAL_LABELS: Record<string, string> = {
  loja: 'Loja Física',
  delivery: 'Delivery',
  encomenda: 'Encomenda',
  outro: 'Outro',
}

export const TIPO_LABELS: Record<string, string> = {
  fixo: 'Fixo',
  variavel: 'Variável',
}
