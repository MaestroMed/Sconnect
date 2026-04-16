import Link from "next/link";
import { ChevronRight, Filter, Phone } from "lucide-react";
import { getRealizations, getSiteConfig } from "@/lib/data-service";
import { buildMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import RealizationsFilterable from "@/components/realisations/RealizationsFilterable";

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

export default function RealisationsPage() {
  const { realizations } = getRealizations();
  const { phone } = getSiteConfig();
  const phoneClean = phone.replace(/\s/g, "");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Réalisations" }]} light />
          </div>
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold mb-6">
                <Filter className="w-4 h-4" />
                Nos Réalisations
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                Découvrez nos{" "}
                <span className="gradient-text">derniers chantiers</span>
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
      <section className="py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600">
        <div className="container-custom text-center">
          <Reveal>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
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
                className="btn bg-white/10 text-white hover:bg-white/20 btn-lg border border-white/20"
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
