import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Wrench, ArrowLeft, ArrowRight } from "lucide-react";
import { getRealizations } from "@/lib/data-service";
import { buildMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import RealizationCard from "@/components/ui/RealizationCard";
import Reveal from "@/components/ui/Reveal";
import { AuroraBackdrop, NoiseOverlay } from "@/components/ui/ambient";

const CATEGORY_LABELS: Record<string, string> = {
  electricite: "Électricité",
  "controle-acces": "Contrôle d'accès",
  serrurerie: "Serrurerie",
  metallerie: "Métallerie",
};

const CATEGORY_HREF: Record<string, string> = {
  electricite: "/services/electricite",
  "controle-acces": "/services/controle-acces",
  serrurerie: "/services/serrurerie",
  metallerie: "/services/metallerie",
};

export async function generateStaticParams() {
  const { realizations } = getRealizations();
  return realizations.map((r) => ({ id: r.id }));
}

type Params = { id: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const { realizations } = getRealizations();
  const realization = realizations.find((r) => r.id === id);
  if (!realization) {
    return buildMetadata({
      title: "Réalisation introuvable",
      path: `/realisations/${id}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: realization.title,
    description: realization.description,
    path: `/realisations/${id}`,
    category: CATEGORY_LABELS[realization.category],
    image: realization.image.startsWith("http") ? realization.image : undefined,
    imageAlt: realization.title,
  });
}

export default async function RealizationDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const { realizations } = getRealizations();
  const realization = realizations.find((r) => r.id === id);

  if (!realization) notFound();

  const related = realizations
    .filter((r) => r.id !== id && r.category === realization.category)
    .slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
  const categoryLabel = CATEGORY_LABELS[realization.category] || realization.category;
  const categoryHref = CATEGORY_HREF[realization.category] || "/services";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: realization.title,
    description: realization.description,
    image: realization.image.startsWith("http")
      ? realization.image
      : `${siteUrl}${realization.image}`,
    locationCreated: { "@type": "Place", name: realization.location },
    creator: { "@type": "Organization", name: "S Connect France", "@id": `${siteUrl}/#organization` },
  };

  const hasCompare =
    realization.imageBefore && realization.imageAfter &&
    realization.imageBefore !== realization.imageAfter;

  return (
    <article className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <header className="relative bg-dark-950 text-white overflow-hidden">
        <AuroraBackdrop intensity="soft" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10 py-12 md:py-16">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Réalisations", href: "/realisations" },
                { label: realization.title },
              ]}
              light
            />
          </div>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-5 text-sm">
              <Link
                href={categoryHref}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors"
              >
                {categoryLabel}
              </Link>
              {realization.serviceType && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/20 px-3 py-1 font-semibold text-accent-200 backdrop-blur">
                  <Wrench className="h-3.5 w-3.5" />
                  {realization.serviceType}
                </span>
              )}
              {realization.featured && (
                <span className="inline-flex items-center rounded-full bg-primary-500/30 px-3 py-1 font-semibold text-primary-100 backdrop-blur">
                  À la une
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-balance mb-5">
              {realization.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-white/85">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {realization.location}
              </span>
              {realization.type && (
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {realization.type}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Image + comparison */}
      <section className="container-custom py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          {hasCompare ? (
            <Reveal>
              <BeforeAfterSlider
                beforeSrc={realization.imageBefore!}
                afterSrc={realization.imageAfter!}
                aspect="4/3"
                className="shadow-2xl border-8 border-surface -mt-24 relative z-10"
              />
              <p className="mt-4 text-center text-sm text-foreground-muted">
                Glissez la poignée pour comparer avant et après.
              </p>
            </Reveal>
          ) : (
            <Reveal>
              <div className="relative aspect-[4/3] -mt-24 rounded-3xl overflow-hidden shadow-2xl border-8 border-surface">
                <Image
                  src={realization.image}
                  alt={realization.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                  unoptimized={realization.image.startsWith("http")}
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1} className="mt-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              Le projet
            </h2>
            <p className="text-lg text-foreground-muted leading-relaxed">
              {realization.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-surface-muted py-16">
          <div className="container-custom">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">
              Autres réalisations en {categoryLabel.toLowerCase()}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <RealizationCard
                  key={r.id}
                  id={r.id}
                  title={r.title}
                  type={r.type}
                  location={r.location}
                  category={CATEGORY_LABELS[r.category] || r.category}
                  image={r.image}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-custom py-12 md:py-16">
        <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-surface-elevated p-8 shadow-lg">
          <div>
            <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-1">
              Un projet similaire ?
            </h3>
            <p className="text-foreground-muted">
              Obtenez un devis gratuit et détaillé en moins de 24h.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/realisations" className="btn-outline btn-sm">
              <ArrowLeft className="h-4 w-4" />
              Toutes les réalisations
            </Link>
            <Link href="/demande-devis" className="btn-primary btn-sm">
              Demander un devis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
