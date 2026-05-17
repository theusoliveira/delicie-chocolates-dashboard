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
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/icons/favicon.ico',
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
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