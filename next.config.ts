import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Remover headers X-Powered-By da resposta
  poweredByHeader: false,

  // Compressão de resposta (gzip)
  compress: true,

  // Strict mode do React para detectar side effects
  reactStrictMode: true,

  // Imagens: permitir otimização de SVGs e configuração de formatos
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
