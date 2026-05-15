import { Metadata } from 'next'
import { Package } from 'lucide-react'
import { getProdutos } from '@/lib/queries'
import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { NovoProdutoModal } from '@/components/features/NovoProdutoModal'
import { TabelaProdutos } from '@/components/features/TabelaProdutos'
import { pluralize } from '@/lib/utils'

export const metadata: Metadata = { title: 'Produtos' }
export const dynamic = 'force-dynamic'

export default async function ProdutosPage() {
  const produtos = await getProdutos()

  return (
    <div>
      <PageHeader
        title="Produtos"
        description={`${produtos.length} ${pluralize(produtos.length, 'produto')} cadastrado${produtos.length !== 1 ? 's' : ''}`}
        action={<NovoProdutoModal />}
      />
      <div className="card overflow-hidden">
        {produtos.length === 0 ? (
          <EmptyState
            icon={Package}
            title="Nenhum produto cadastrado"
            description="Cadastre produtos para vinculá-los às suas vendas."
          />
        ) : (
          <TabelaProdutos produtos={produtos} />
        )}
      </div>
    </div>
  )
}
