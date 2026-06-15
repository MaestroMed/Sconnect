import Link from "next/link";
import { ChevronRight, Filter, Phone } from "lucide-react";
// data-adapter (et non data-service JSON-only) : la page reflète ainsi le
// back-office quand Supabase est configuré, et retombe sur le JSON committé
// sinon. Sans ça, les réalisations éditées dans l'admin n'apparaissaient
// jamais sur cette page (elle lisait toujours le fichier JSON).
import { getRealizations, getSiteConfig } from "@/lib/data-adapter";
import { buildMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import RealizationsFilterable from "@/components/realisations/RealizationsFilterable";
import { AuroraBackdrop, GradientVeil, NoiseOverlay, ParticlesLite } from "@/components/ui/ambient";
import BulbText from "@/components/ui/BulbText";

const CATEGORY_LABELS: Record<string, string> = {
  electricite: "Électricité",
  "controle-acces": "Contrôle d'accès",
  serrurerie: "Serrurerie",
  metallerie: "Métallerie",
};

export const metadata = buildMetadata({
  title: "Nos réalisations",
  description:
    "Découvrez nos derniers chantiers en électricité, contrôle d'accès, serrurerie et métallerie en Île-de-France.",
  path: "/realisations",
});

export default async function RealisationsPage() {
  const { realizations } = await getRealizations();
  const { phone } = await getSiteConfig();
  const phoneClean = phone.replace(/\s/g, "");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <AuroraBackdrop intensity="soft" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Réalisations" }]} light />
          </div>
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                <Filter className="w-4 h-4" />
                Nos Réalisations
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Découvrez nos{" "}
                <BulbText>derniers chantiers</BulbText>
              </h1>
              <p className="text-xl text-dark-300 leading-relaxed">
                Un aperçu de notre savoir-faire à travers des projets variés :
                installations neuves, rénovations, dépannages et solutions connectées.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <RealizationsFilterable items={realizations} categoryLabels={CATEGORY_LABELS} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-dark-950 overflow-hidden">
        <div className="absolute inset-0 animate-aurora bg-[length:200%_200%] bg-gradient-to-r from-primary-700 via-electric-500 to-primary-700" />
        <GradientVeil variant="brand" className="opacity-60" />
        <ParticlesLite variant="white" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <NoiseOverlay opacity={0.06} />
        <div className="container-custom relative z-10 text-center">
          <Reveal>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Vous avez un projet similaire ?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Contactez-nous pour discuter de votre projet. Nous vous proposerons
              une solution adaptée à vos besoins et votre budget.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demande-devis" className="btn-white btn-lg">
                Demander un devis
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${phoneClean}`}
                className="btn glass-panel text-white hover:bg-white/15 btn-lg"
              >
                <Phone className="w-5 h-5" />
                {phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
