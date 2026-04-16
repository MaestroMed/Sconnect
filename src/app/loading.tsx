import { Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-surface">
      <div className="text-center" role="status" aria-live="polite">
        <div className="relative mx-auto mb-6 h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-primary-500/30" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-electric-500 shadow-lg shadow-primary-500/30">
            <Zap className="h-8 w-8 text-white animate-pulse" />
          </div>
        </div>
        <p className="font-medium text-foreground-muted">Chargement…</p>
      </div>
    </div>
  );
}
