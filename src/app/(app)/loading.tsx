export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-40 bg-chocolate-100 rounded-lg" />
          <div className="h-4 w-64 bg-chocolate-50 rounded-lg" />
        </div>
        <div className="h-10 w-32 bg-chocolate-100 rounded-lg" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-5 space-y-3">
            <div className="h-3 w-20 bg-chocolate-100 rounded" />
            <div className="h-7 w-28 bg-chocolate-100 rounded" />
            <div className="h-3 w-16 bg-chocolate-50 rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="card overflow-hidden">
        <div className="divide-y divide-chocolate-50">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="h-4 w-20 bg-chocolate-50 rounded" />
              <div className="h-4 w-32 bg-chocolate-100 rounded" />
              <div className="h-4 w-24 bg-chocolate-50 rounded" />
              <div className="ml-auto h-4 w-16 bg-chocolate-50 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}