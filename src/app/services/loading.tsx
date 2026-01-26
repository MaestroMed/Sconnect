import { Loader2 } from "lucide-react";

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-28">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-16 w-16 bg-white/10 rounded-2xl mb-6" />
            <div className="h-12 w-3/4 bg-white/10 rounded-lg mb-4" />
            <div className="h-6 w-1/2 bg-white/10 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-dark-100 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="fixed bottom-8 right-8">
        <div className="bg-white rounded-full shadow-xl p-4">
          <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
        </div>
      </div>
    </div>
  );
}
