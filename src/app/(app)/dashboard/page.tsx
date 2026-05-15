import { Metadata } from 'next'
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Receipt, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { getVendas, getGastos } from '@/lib/queries'
import { StatCard } from '@/components/ui/StatCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { formatCurrency, formatDate, getMesAtual, CANAL_LABELS, pluralize } from '@/lib/utils'
import { GraficoDashboard } from '@/components/features/GraficoDashboard'

export const metadata: Metadata = { title: 'Dashboard' }
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const mes = getMesAtual()
  const [vendas, gastos] = await Promise.all([
    getVendas(mes),
    getGastos(mes),
  ])

  const vendasPagas = vendas.filter((v) => v.status === 'pago')

  const totalVendas = vendasPagas.reduce((s, v) => s + v.valor_total, 0)
  const totalGastos = gastos.reduce((s, g) => s + g.valor, 0)
  const lucro = totalVendas - totalGastos
  const ticketMedio = vendasPagas.length > 0 ? totalVendas / vendasPagas.length : 0

  const ultimasVendas = vendasPagas.slice(0, 5)
  const ultimosGastos = gastos.slice(0, 5)

  const mesNome = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description={`Resumo financeiro de ${mesNome}`}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <StatCard
          title="Total de Vendas"
          value={formatCurrency(totalVendas)}
          subtitle={`${vendasPagas.length} pagas · ${vendas.length - vendasPagas.length} pendentes`}
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Total de Gastos"
          value={formatCurrency(totalGastos)}
          subtitle={`${gastos.length} ${pluralize(gastos.length, 'gasto')} no mês`}
          icon={TrendingDown}
          variant="danger"
        />
        <StatCard
          title="Lucro do Mês"
          value={formatCurrency(lucro)}
          subtitle={lucro >= 0 ? 'No positivo 🎉' : 'No negativo ⚠️'}
          icon={DollarSign}
          variant={lucro >= 0 ? 'success' : 'danger'}
        />
        <StatCard
          title="Ticket Médio"
          value={ticketMedio > 0 ? formatCurrency(ticketMedio) : 'R$ 0,00'}
          subtitle="por venda paga"
          icon={BarChart3}
        />
      </div>

      {/* Chart */}
      <div className="card p-6 mb-8">
        <h2 className="text-base font-semibold text-chocolate-900 mb-4">
          Vendas × Gastos (mês atual)
        </h2>
        <GraficoDashboard vendas={vendasPagas} gastos={gastos} />
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimas Vendas */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-chocolate-900 flex items-center gap-2">
              <ShoppingBag size={16} className="text-green-600" />
              Últimas Vendas
            </h2>
            <Link href="/vendas" className="text-xs text-chocolate-500 hover:text-chocolate-700 transition-colors">
              Ver todas →
            </Link>
          </div>
          {ultimasVendas.length === 0 ? (
            <p className="text-sm text-chocolate-400 py-4 text-center">Nenhuma venda registrada este mês</p>
          ) : (
            <ul className="space-y-3">
              {ultimasVendas.map((v) => (
                <li key={v.id} className="flex items-center justify-between py-2 border-b border-chocolate-50 last:border-0">
                  <div className="min-w-0 mr-3">
                    <p className="text-sm font-medium text-chocolate-800 truncate">{v.cliente ?? v.descricao}</p>
                    <p className="text-xs text-chocolate-400">{formatDate(v.data)} · {CANAL_LABELS[v.canal]}</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600 whitespace-nowrap">{formatCurrency(v.valor_total)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Últimos Gastos */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-chocolate-900 flex items-center gap-2">
              <Receipt size={16} className="text-red-500" />
              Últimos Gastos
            </h2>
            <Link href="/gastos" className="text-xs text-chocolate-500 hover:text-chocolate-700 transition-colors">
              Ver todos →
            </Link>
          </div>
          {ultimosGastos.length === 0 ? (
            <p className="text-sm text-chocolate-400 py-4 text-center">Nenhum gasto registrado este mês</p>
          ) : (
            <ul className="space-y-3">
              {ultimosGastos.map((g) => (
                <li key={g.id} className="flex items-center justify-between py-2 border-b border-chocolate-50 last:border-0">
                  <div className="min-w-0 mr-3">
                    <p className="text-sm font-medium text-chocolate-800 truncate">{g.descricao}</p>
                    <p className="text-xs text-chocolate-400">
                      {formatDate(g.data)}
                      {g.categoria && ` · ${g.categoria.nome}`}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-red-500 whitespace-nowrap">{formatCurrency(g.valor)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
