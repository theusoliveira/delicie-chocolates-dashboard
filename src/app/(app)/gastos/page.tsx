import { Metadata } from 'next'
import { Receipt } from 'lucide-react'
import { Suspense } from 'react'
import { getGastos, getCategorias } from '@/lib/queries'
import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { NovoGastoModal } from '@/components/features/NovoGastoModal'
import { TabelaGastos } from '@/components/features/TabelaGastos'
import { formatCurrency, getMesAtual, pluralize } from '@/lib/utils'
import { FiltroMes } from '@/components/ui/FiltroMes'

export const metadata: Metadata = { title: 'Gastos' }
export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ mes?: string }>
}

export default async function GastosPage({ searchParams }: Props) {
  const params = await searchParams
  const mes = params.mes || getMesAtual()

  const [gastos, categorias] = await Promise.all([
    getGastos(mes),
    getCategorias(),
  ])

  const total = gastos.reduce((s, g) => s + g.valor, 0)

  const [year, month] = mes.split('-')
  const mesNome = new Date(Number(year), Number(month) - 1).toLocaleDateString('pt-BR', {
    month: 'long', year: 'numeric',
  })

  return (
    <div>
      <PageHeader
        title="Gastos"
        description={`${gastos.length} ${pluralize(gastos.length, 'gasto')} em ${mesNome} · Total: ${formatCurrency(total)}`}
        action={<NovoGastoModal categorias={categorias} />}
      />

      <Suspense>
        <FiltroMes value={mes} />
      </Suspense>

      <div className="card overflow-hidden">
        {gastos.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="Nenhum gasto registrado"
            description="Clique em 'Novo Gasto' para registrar seu primeiro gasto deste período."
          />
        ) : (
          <TabelaGastos gastos={gastos} />
        )}
      </div>
    </div>
  )
}
