import { Metadata } from 'next'
import { ShoppingBag } from 'lucide-react'
import { Suspense } from 'react'
import { getVendas, getProdutos } from '@/lib/queries'
import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { NovaVendaModal } from '@/components/features/NovaVendaModal'
import { TabelaVendas } from '@/components/features/TabelaVendas'
import { formatCurrency, getMesAtual, pluralize } from '@/lib/utils'
import { FiltroMes } from '@/components/ui/FiltroMes'

export const metadata: Metadata = { title: 'Vendas' }
export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ mes?: string }>
}

export default async function VendasPage({ searchParams }: Props) {
  const params = await searchParams
  const mes = params.mes || getMesAtual()

  const [vendas, produtos] = await Promise.all([
    getVendas(mes),
    getProdutos(),
  ])

  const total = vendas.reduce((s, v) => s + v.valor_total, 0)

  const [year, month] = mes.split('-')
  const mesNome = new Date(Number(year), Number(month) - 1).toLocaleDateString('pt-BR', {
    month: 'long', year: 'numeric',
  })

  return (
    <div>
      <PageHeader
        title="Vendas"
        description={`${vendas.length} ${pluralize(vendas.length, 'venda')} em ${mesNome} · Total: ${formatCurrency(total)}`}
        action={<NovaVendaModal produtos={produtos} />}
      />

      <Suspense>
        <FiltroMes value={mes} />
      </Suspense>

      <div className="card overflow-hidden">
        {vendas.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Nenhuma venda registrada"
            description="Clique em 'Nova Venda' para registrar sua primeira venda deste período."
          />
        ) : (
          <TabelaVendas vendas={vendas} />
        )}
      </div>
    </div>
  )
}
