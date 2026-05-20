/**
 * Route-level loading state. Skeleton placeholders that mirror the hero +
 * first content block of any page → preserves layout (no CLS), reads as
 * "loading" without a hard full-screen spinner.
 *
 * Previous version was a full-bleed "Chargement…" with a pulsing icon,
 * flagged by the audit as anti-pattern (bad LCP perception, layout flash).
 * This one stays visible only during streaming and dissolves naturally
 * when the real content streams in.
 */
function Bar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 animate-pulse ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <div role="status" aria-live="polite" aria-label="Chargement de la page" className="min-h-screen bg-surface">
      {/* Hero skeleton — dark band, mirrors most page hero heights */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-custom relative z-10">
          {/* Breadcrumb-ish */}
          <div className="mb-8 flex items-center gap-2">
            <Bar className="h-3 w-16 opacity-60" />
            <Bar className="h-3 w-2 opacity-30" />
            <Bar className="h-3 w-24 opacity-60" />
          </div>
          <div className="max-w-2xl space-y-5">
            {/* Eyebrow chip */}
            <Bar className="h-7 w-44 rounded-full opacity-70" />
            {/* H1 */}
            <Bar className="h-12 md:h-14 w-full opacity-70" />
            <Bar className="h-12 md:h-14 w-4/5 opacity-70" />
            {/* Subtitle */}
            <Bar className="h-5 w-3/4 opacity-50 mt-6" />
            <Bar className="h-5 w-2/3 opacity-50" />
            {/* CTAs */}
            <div className="mt-8 flex gap-3">
              <Bar className="h-12 w-44 rounded-xl opacity-80" />
              <Bar className="h-12 w-40 rounded-xl opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Content block skeleton */}
      <section className="container-custom py-12 md:py-20">
        <div className="max-w-3xl mx-auto mb-12 text-center space-y-3">
          <Bar className="h-6 w-32 mx-auto rounded-full" />
          <Bar className="h-10 w-3/4 mx-auto" />
          <Bar className="h-4 w-5/6 mx-auto mt-3" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface-elevated p-6 space-y-3">
              <Bar className="h-12 w-12 rounded-xl" />
              <Bar className="h-5 w-3/4" />
              <Bar className="h-4 w-full" />
              <Bar className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </section>

      <span className="sr-only">Chargement en cours</span>
    </div>
  );
}
