import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  Award,
  MapPin,
  Calendar,
  ArrowRight,
  Mail,
  Phone,
  ChevronRight,
  ShieldCheck,
  Zap,
  Lightbulb,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BulbText from "@/components/ui/BulbText";
import { NoiseOverlay } from "@/components/ui/ambient";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Mehdi Belkacem — Fondateur S Connect | Expert relamping LED en IDF",
  description:
    "Fondateur de S Connect France en 2021. Électricien spécialisé relamping LED, certifié Qualifélec et IRVE. Audits éclairage et accompagnement décret tertiaire pour bureaux, commerces, copropriétés et industriels en Île-de-France.",
  alternates: { canonical: "/auteur/mehdi-belkacem" },
  openGraph: {
    type: "profile",
    title: "Mehdi Belkacem — Fondateur S Connect",
    description:
      "Électricien spécialisé relamping LED, audits éclairage tertiaire et conformité décret DEET en Île-de-France.",
    images: ["/images/team/team-technicien.webp"],
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";

const certifications = [
  {
    name: "Qualifélec mention Éclairage",
    desc: "Qualification professionnelle reconnue par l'État pour les chantiers d'éclairage tertiaire.",
    icon: Lightbulb,
  },
  {
    name: "RGE Quali'Eco",
    desc: "Reconnu Garant de l'Environnement pour les chantiers éligibles aux aides énergétiques.",
    icon: ShieldCheck,
  },
  {
    name: "IRVE niveau 2",
    desc: "Habilitation pour l'installation de bornes de recharge VE (résidentiel + tertiaire).",
    icon: Zap,
  },
  {
    name: "Habilitation B2V / BR / BC",
    desc: "Travaux d'ordre électrique sous tension basse et hors tension, consignation.",
    icon: Award,
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/auteur/mehdi-belkacem#person`,
  name: "Mehdi Belkacem",
  givenName: "Mehdi",
  familyName: "Belkacem",
  jobTitle: "Fondateur S Connect France",
  description:
    "Fondateur de S Connect France. Électricien spécialisé relamping LED, audit éclairage tertiaire et accompagnement décret DEET en Île-de-France.",
  image: `${siteUrl}/images/team/team-technicien.webp`,
  url: `${siteUrl}/auteur/mehdi-belkacem`,
  worksFor: { "@id": `${siteUrl}/#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: "35 rue des Cailloux",
    addressLocality: "Clichy",
    postalCode: "92110",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  knowsAbout: [
    "Relamping LED",
    "Audit éclairage tertiaire",
    "Norme NF EN 12464-1",
    "Décret tertiaire DEET",
    "Certificats d'Économie d'Énergie (CEE)",
    "Installation électrique NF C 15-100",
    "Contrôle d'accès",
    "Serrurerie A2P",
    "Métallerie sur mesure",
    "Borne de recharge IRVE",
  ],
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.name,
  })),
};

export default async function MehdiBelkacemPage() {
  const allPosts = await getAllPosts();
  const mehdiPosts = allPosts.filter((p) =>
    p.frontmatter.author?.toLowerCase().includes("mehdi"),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ─── Hero — portrait + intro ─────────────────────────────────────── */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <NoiseOverlay opacity={0.04} />
        <div className="absolute top-0 left-1/3 w-[40rem] h-[40rem] bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[30rem] h-[30rem] bg-electric-500/15 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs light items={[{ label: "Auteur" }, { label: "Mehdi Belkacem" }]} />
          </div>

          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-center">
            {/* Portrait */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-dark-900 border border-white/10 shadow-2xl max-w-md">
              <Image
                src="/images/team/team-technicien.webp"
                alt="Mehdi Belkacem, fondateur S Connect"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
            </div>

            {/* Bio */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-400/30 text-primary-200 text-sm font-semibold mb-6 backdrop-blur-md">
                <Award className="w-4 h-4" />
                Fondateur S Connect · Auteur
              </span>

              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
                Mehdi Belkacem
              </h1>

              <p className="text-xl md:text-2xl font-medium mb-6">
                <BulbText>Artisan-ingénieur, spécialiste relamping LED</BulbText>
              </p>

              <div className="space-y-4 text-lg text-white/85 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
                <p>
                  J&apos;ai fondé <strong>S Connect France</strong> en 2021 à Clichy avec une
                  idée simple : faire de l&apos;artisanat électrique de niveau ingénieur — méthode
                  rigoureuse, mesures réelles, devis transparents — accessible aux particuliers
                  comme aux professionnels d&apos;Île-de-France.
                </p>
                <p>
                  Depuis le décret tertiaire et l&apos;explosion des aides CEE, j&apos;ai
                  concentré une grande partie de notre activité sur le <strong>relamping LED</strong>
                  pour les bureaux, commerces, copropriétés et sites industriels. C&apos;est le
                  poste d&apos;économie le plus rentable à engager aujourd&apos;hui — et l&apos;un
                  des moins bien compris du marché.
                </p>
                <p>
                  J&apos;écris régulièrement sur ce blog pour partager ce qu&apos;on apprend en
                  chantier : méthode d&apos;audit, prix réels, comparatifs honnêtes, montage de
                  dossier CEE. Pas de marketing, juste ce qu&apos;il faut savoir pour prendre une
                  décision éclairée.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-300" />
                  Clichy 92, Île-de-France
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-300" />
                  En activité depuis 2021
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="tel:+33652820685"
                  className="btn-primary btn-lg"
                >
                  <Phone className="w-5 h-5" />
                  06 52 82 06 85
                </a>
                <a
                  href="mailto:contact@sconnect-france.fr"
                  className="btn glass-panel text-white hover:bg-white/15 btn-lg"
                >
                  <Mail className="w-5 h-5" />
                  contact@sconnect-france.fr
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Certifications ──────────────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 text-primary-700 dark:bg-primary-500/15 dark:border-primary-500/30 dark:text-primary-300 text-sm font-semibold mb-5">
              <ShieldCheck className="w-4 h-4" />
              Qualifications professionnelles
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Certifications & habilitations
            </h2>
            <p className="text-lg text-foreground-muted">
              Toutes nos interventions sont couvertes par notre garantie décennale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {certifications.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.name}
                  className="flex gap-4 p-6 rounded-2xl bg-surface-elevated border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-electric-500 flex items-center justify-center text-white shrink-0 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-1">
                      {c.name}
                    </h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Articles signés ─────────────────────────────────────────────── */}
      {mehdiPosts.length > 0 && (
        <section className="section-padding bg-surface-muted">
          <div className="container-custom max-w-5xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 text-amber-700 dark:bg-amber-500/15 dark:border-amber-500/30 dark:text-amber-300 text-sm font-semibold mb-5">
                <Lightbulb className="w-4 h-4" />
                Articles & guides
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                Mes derniers articles
              </h2>
              <p className="text-lg text-foreground-muted">
                Méthode, prix réels, comparatifs, dossier CEE — sans bullshit marketing.
              </p>
            </div>

            <div className="space-y-3">
              {mehdiPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/actualites/${p.slug}`}
                  className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-5 md:p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500/50 hover:shadow-lg transition-all"
                >
                  {p.frontmatter.category && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300 shrink-0 w-fit">
                      {p.frontmatter.category}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-lg md:text-xl text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors mb-1">
                      {p.frontmatter.title}
                    </h3>
                    <p className="text-foreground-muted text-sm leading-relaxed line-clamp-2">
                      {p.frontmatter.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-foreground-muted shrink-0">
                    <span>{formatDate(p.frontmatter.date)}</span>
                    <span className="text-primary-600 dark:text-primary-300 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/actualites" className="btn-outline">
                Toutes les actualités
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Final CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Un projet électrique ou un relamping en tête ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Appelez-moi directement, je réponds. Pas de standard, pas de filtre commercial.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+33652820685" className="btn-white btn-lg">
              <Phone className="w-5 h-5" />
              06 52 82 06 85
            </a>
            <Link
              href="/demande-devis"
              className="btn bg-accent-500 text-dark-900 hover:bg-accent-400 btn-lg shadow-lg shadow-accent-500/25"
            >
              Demander un devis
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
