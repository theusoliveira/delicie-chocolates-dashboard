export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <p className="text-6xl mb-4">🍫</p>
        <h1 className="text-2xl font-bold text-chocolate-900 mb-2">Página não encontrada</h1>
        <a href="/dashboard" className="text-chocolate-600 hover:text-chocolate-800 underline text-sm">
          Voltar ao início
        </a>
      </div>
    </div>
  )
}