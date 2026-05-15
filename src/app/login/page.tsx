import { Metadata } from 'next'
import { LoginForm } from '@/components/features/LoginForm'

export const metadata: Metadata = {
  title: 'Entrar | Deliciê Chocolates',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-chocolate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Marca */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-chocolate-400 rounded-full text-3xl mb-4 shadow-lg">
            🍫
          </div>
          <h1 className="text-2xl font-bold text-white">Deliciê Chocolates</h1>
          <p className="text-chocolate-300 text-sm mt-1">Sistema de gestão financeira</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-lg font-semibold text-chocolate-900 mb-6">Entrar na conta</h2>
          <LoginForm />
        </div>

        <p className="text-center text-chocolate-600 text-xs mt-6">
          © {new Date().getFullYear()} Deliciê Chocolates
        </p>
      </div>
    </div>
  )
}
