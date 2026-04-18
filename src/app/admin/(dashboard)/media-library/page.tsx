import { AlertCircle, FolderOpen } from "lucide-react";
import { isPersistenceAvailable } from "@/lib/data-adapter";
import { listAllMedia } from "@/lib/supabase/storage";
import MediaLibraryClient from "./MediaLibraryClient";

export const dynamic = "force-dynamic";

export default async function MediaLibraryPage() {
  if (!isPersistenceAvailable()) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Bibliothèque média
          </h1>
        </header>
        <div className="rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950 p-6 flex gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-100">
              Supabase Storage non configuré
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              Configurez Supabase puis créez un bucket public{" "}
              <code>sconnectfrance</code> pour activer la bibliothèque.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const items = await listAllMedia();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-300 uppercase tracking-wide mb-1">
            Stockage
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <FolderOpen className="w-7 h-7 text-primary-500" />
            Bibliothèque média ({items.length})
          </h1>
          <p className="text-foreground-muted mt-1 text-sm">
            Toutes les images stockées sur Supabase Storage. Sélectionnez pour supprimer en lot.
          </p>
        </div>
      </header>

      <MediaLibraryClient initialItems={items} />
    </div>
  );
}
