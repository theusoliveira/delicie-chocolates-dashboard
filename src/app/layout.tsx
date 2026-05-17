import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import { PWARegister } from '@/components/ui/PWARegister'
import './globals.css'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-ubuntu',
})

export const metadata: Metadata = {
  title: { template: '%s | Deliciê Chocolates', default: 'Deliciê Chocolates' },
  description: 'Sistema de gestão financeira da Deliciê Chocolates',
  robots: { index: false },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Deliciê',
  },
  themeColor: '#1c0a00',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={ubuntu.variable}>
      <body className="bg-cream min-h-screen font-ubuntu">
        <PWARegister />
        {children}
      </body>
    </html>
  )
}