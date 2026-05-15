-- =============================================
-- Schema: Deliciê Chocolates
-- Execute este SQL no Supabase SQL Editor
-- =============================================

-- Tabela de categorias de gastos
CREATE TABLE IF NOT EXISTS categorias_gasto (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL UNIQUE,
  cor text NOT NULL DEFAULT '#6b3a11',
  created_at timestamptz DEFAULT now()
);

-- Tabela de produtos vendidos
CREATE TABLE IF NOT EXISTS produtos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  preco_unitario numeric(10,2) NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Tabela de vendas
CREATE TABLE IF NOT EXISTS vendas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao text NOT NULL,
  produto_id uuid REFERENCES produtos(id) ON DELETE SET NULL,
  quantidade integer NOT NULL DEFAULT 1,
  valor_total numeric(10,2) NOT NULL,
  data date NOT NULL DEFAULT CURRENT_DATE,
  canal text CHECK (canal IN ('loja', 'delivery', 'encomenda', 'outro')) DEFAULT 'loja',
  observacoes text,
  created_at timestamptz DEFAULT now()
);

-- Tabela de gastos
CREATE TABLE IF NOT EXISTS gastos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao text NOT NULL,
  categoria_id uuid REFERENCES categorias_gasto(id) ON DELETE SET NULL,
  valor numeric(10,2) NOT NULL,
  data date NOT NULL DEFAULT CURRENT_DATE,
  tipo text CHECK (tipo IN ('fixo', 'variavel')) DEFAULT 'variavel',
  observacoes text,
  created_at timestamptz DEFAULT now()
);

-- Inserir categorias padrão
INSERT INTO categorias_gasto (nome, cor) VALUES
  ('Matéria-prima', '#92400e'),
  ('Embalagens', '#b45309'),
  ('Aluguel', '#6b3a11'),
  ('Energia', '#d97706'),
  ('Funcionários', '#7c3aed'),
  ('Marketing', '#0369a1'),
  ('Equipamentos', '#059669'),
  ('Outros', '#6b7280')
ON CONFLICT (nome) DO NOTHING;

-- Inserir produtos exemplo
INSERT INTO produtos (nome, preco_unitario) VALUES
  ('Caixa de Bombons (250g)', 35.00),
  ('Trufas (12 un)', 28.00),
  ('Barra de Chocolate Artesanal', 18.00),
  ('Kit Presente', 75.00),
  ('Ovo de Páscoa (500g)', 65.00)
ON CONFLICT DO NOTHING;

-- RLS (Row Level Security) - desativar para desenvolvimento simples
-- Para produção com autenticação, configure policies apropriadas
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_gasto ENABLE ROW LEVEL SECURITY;

-- Policies públicas (para MVP sem autenticação)
CREATE POLICY "allow_all_vendas" ON vendas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_gastos" ON gastos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_produtos" ON produtos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_categorias" ON categorias_gasto FOR ALL USING (true) WITH CHECK (true);
