# 🍫 Deliciê Chocolates — Sistema de Gestão Financeira

Sistema para registrar vendas e gastos da Deliciê Chocolates, construído com **Next.js 15** e **Supabase**.

---

## 🚀 Configuração Rápida

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um projeto gratuito
2. No painel do projeto, vá em **Settings → API**
3. Copie a **Project URL** e a **anon public key**

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_ANON_KEY
```

### 4. Criar as tabelas no banco

1. No painel do Supabase, vá em **SQL Editor**
2. Cole o conteúdo do arquivo `supabase-schema.sql`
3. Clique em **Run**

Isso criará as tabelas e já inserirá categorias e produtos de exemplo.

### 5. Rodar o projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── dashboard/      # Resumo financeiro do mês
│   ├── vendas/         # Listagem e cadastro de vendas
│   └── gastos/         # Listagem e cadastro de gastos
├── actions/            # Server Actions (CRUD no Supabase)
├── components/
│   ├── ui/             # Componentes genéricos
│   └── features/       # Componentes de domínio
├── lib/                # Supabase client e utilitários
└── types/              # Tipos TypeScript
```

---

## ✅ Funcionalidades

- **Dashboard** com resumo mensal (vendas, gastos, lucro, ticket médio)
- **Gráfico** de barras com evolução diária de vendas vs gastos
- **Vendas**: cadastro com produto, canal (loja/delivery/encomenda), quantidade e valor
- **Gastos**: cadastro com categoria, tipo (fixo/variável) e valor
- **Filtro por mês** nas telas de vendas e gastos
- **Excluir** registros com confirmação
- Categorias de gasto pré-cadastradas (Matéria-prima, Embalagens, Aluguel, etc.)
- Produtos de exemplo pré-cadastrados

---

## 🛠 Tecnologias

- **Next.js 15** — App Router, Server Actions, Server Components
- **Supabase** — PostgreSQL como banco de dados
- **Tailwind CSS** — Estilização
- **Recharts** — Gráficos
- **TypeScript** — Tipagem estática
