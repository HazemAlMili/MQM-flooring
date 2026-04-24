export default function Loading() {
  return (
    <div className="pt-24">
      {/* PageHero skeleton */}
      <div className="bg-surface/50 py-20 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="animate-pulse space-y-4 max-w-lg">
            <div className="h-12 bg-white/5 rounded" />
            <div className="h-5 bg-white/5 rounded w-2/3" />
          </div>
        </div>
      </div>

      {/* Filter row skeleton */}
      <div className="container mx-auto px-4 md:px-6 pt-20">
        <div className="flex gap-2 mb-12 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-white/5 rounded" />
          ))}
        </div>

        {/* Card grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-72 bg-white/5 rounded-sm mb-4" />
              <div className="h-6 bg-white/5 rounded w-3/4 mb-2" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
