import { Sidebar } from '@/components/ui/Sidebar'
import { BottomNav } from '@/components/ui/BottomNav'
import { LogoutButton } from '@/components/ui/LogoutButton'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Header mobile */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-chocolate-900 text-white">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">🍫</span>
            <span className="font-semibold text-sm">Deliciê Chocolates</span>
          </div>
          <LogoutButton compact />
        </header>
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
