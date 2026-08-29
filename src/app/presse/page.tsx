import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Download, Mail, Phone, Award, ChevronRight, FileText } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionTitle from "@/components/ui/SectionTitle";
import { NoiseOverlay } from "@/components/ui/ambient";
import BulbText from "@/components/ui/BulbText";

export const metadata: Metadata = {
  title: "Espace presse — kit, photos, citations",
  description:
    "Journalistes, blogueurs, organismes professionnels : retrouvez ici le kit presse S Connect France, les logos haute définition, les photos d'intervention, la biographie du fondateur Mehdi Belkacem et les éléments de langage validés.",
  alternates: { canonical: "/presse" },
  openGraph: {
    title: "Espace presse — S Connect France",
    description:
      "Kit presse complet : logos, photos, bio fondateur, éléments de langage. Pour interviews et citations média.",
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";

// Schema.org NewsMediaOrganization extension — declares ourselves as a
// citable source for journalists writing about electrical / relamping topics.
const pressOrgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#press-org`,
  name: "S Connect France",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  founder: {
    "@type": "Person",
    "@id": `${siteUrl}/auteur/mehdi-belkacem#person`,
    name: "Mehdi Belkacem",
    jobTitle: "Fondateur, électricien certifié",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Press contact",
    email: "contact@sconnectfrance.fr",
    telephone: "+33-6-52-82-06-85",
    availableLanguage: ["French", "English"],
  },
  sameAs: [
    "https://facebook.com/sconnectfrance",
    "https://linkedin.com/company/sconnectfrance",
    "https://instagram.com/sconnectfrance",
  ],
};

const KEY_STATS = [
  { label: "Année de fondation", value: "2021", note: "Société par actions simplifiée" },
  { label: "Interventions/an", value: "3 000+", note: "Particuliers + professionnels IDF" },
  { label: "Note moyenne", value: "4,9/5", note: "127 avis vérifiés en interne" },
  { label: "Couverture géographique", value: "92 + 75 + 93 + 94", note: "Île-de-France complète" },
  { label: "Certifications", value: "IRVE niveau 2", note: "Garantie décennale active" },
  { label: "Verticales métier", value: "4", note: "Électricité, contrôle d'accès, serrurerie, métallerie" },
];

const TALKING_POINTS = [
  {
    title: "Suppression CEE éclairage février 2026",
    pitch:
      "L'arrêté du 23 février 2026 a supprimé les fiches CEE éclairage LED (BAT-EQ-127, IND-BA-116, BAR-EQ-110). Mehdi Belkacem peut commenter l'impact sur les projets en cours, les alternatives de financement et la stratégie 2026 que recommandent les artisans de terrain.",
  },
  {
    title: "Relamping LED en copropriété — droit à la prise et IRVE",
    pitch:
      "Évolution récente des règles en copropriété : éclairage des communes, infrastructure collective IRVE, droit à la prise. Témoignages chantiers + retours d'expérience avec syndics.",
  },
  {
    title: "Décret tertiaire (DEET) — où en sont les PME en 2026",
    pitch:
      "Mehdi a réalisé des audits éclairage sur 80+ bâtiments tertiaires en 2024-2025. Photo de terrain : où en sont vraiment les PME, ce qu'elles ignorent, les sanctions OPERAT redoutées (à tort ou à raison).",
  },
  {
    title: "Mythes et réalités sur le LED bas de gamme",
    pitch:
      "Mehdi peut détailler les arnaques fréquentes (LED bricolage AliExpress en pro, drivers flicker, durée de vie surévaluée), les drapeaux rouges à reconnaître, et la grille de lecture d'un devis honnête.",
  },
];

const ASSETS = [
  {
    label: "Logo couleur — SVG",
    file: "/images/logo_sconnect.svg",
    desc: "Lockup couleur primaire sur fond clair",
    download: "sconnect-france-logo-color.svg",
  },
  {
    label: "Logo blanc — SVG",
    file: "/images/logo_only_white.svg",
    desc: "Marque blanche pour fonds sombres",
    download: "sconnect-france-logo-white.svg",
  },
  {
    label: "Photo équipe",
    file: "/images/team/team-equipe.webp",
    desc: "Photo HD libre d'usage rédactionnel — credit S Connect",
    download: "sconnect-france-equipe.webp",
  },
  {
    label: "Photo technicien",
    file: "/images/team/team-technicien.webp",
    desc: "Photo HD libre d'usage rédactionnel — credit S Connect",
    download: "sconnect-france-technicien.webp",
  },
  {
    label: "Portrait Mehdi Belkacem (fondateur)",
    file: "/images/team/team-technicien.webp",
    desc: "Pour interviews et bio. Mention : Mehdi Belkacem, fondateur S Connect France",
    download: "mehdi-belkacem-portrait.webp",
  },
];

export default function PressePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pressOrgSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <NoiseOverlay opacity={0.04} />
        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs light items={[{ label: "Presse" }]} />
          </div>
          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Espace presse
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Kit complet pour journalistes et organismes pros</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Logos vectoriels, photos HD, bio du fondateur, chiffres clés, sujets sur
              lesquels nous pouvons commenter. Tout ce qu&apos;il faut pour citer
              S Connect France dans votre prochain article — sans nous appeler 3 fois.
            </p>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle badge="En chiffres" title="Les faits clés sur S Connect France" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEY_STATS.map((s) => (
              <div key={s.label} className="p-5 rounded-2xl bg-surface-elevated border border-border">
                <div
                  className="font-display font-bold text-3xl text-primary-700 dark:text-primary-300 mb-1"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {s.value}
                </div>
                <div className="text-sm font-semibold text-foreground">{s.label}</div>
                <div className="text-xs text-foreground-muted mt-1">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talking points */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Sujets d'interview"
            title="Sur quoi Mehdi peut commenter"
            subtitle="Liste vivante. Si un sujet voisin vous intéresse, contactez-nous — on cadre un échange de 20-30 min sous 48 h."
          />
          <div className="space-y-4">
            {TALKING_POINTS.map((t) => (
              <div key={t.title} className="p-5 rounded-2xl bg-surface border border-border">
                <h3 className="font-display font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-500" />
                  {t.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t.pitch}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio fondateur */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle badge="Fondateur" title="Mehdi Belkacem — bio courte" centered={false} />
          <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-dark-900">
              <Image
                src="/images/team/team-technicien.webp"
                alt="Mehdi Belkacem, fondateur de S Connect France"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
              <p>
                <strong>Mehdi Belkacem</strong> est le fondateur de S Connect France
                (Clichy, 2021). Électricien certifié{" "}
                <strong>IRVE niveau 2</strong> et habilité
                <strong> B2V/BR/BC</strong>, il s&apos;est spécialisé sur l&apos;éclairage tertiaire
                (relamping LED, gestion DALI, conformité décret tertiaire) et sur les
                bornes de recharge IRVE.
              </p>
              <p>
                Sur le terrain depuis 12 ans, il intervient en Île-de-France pour des
                bureaux, copropriétés, commerces, industriels et particuliers. Il
                accompagne les organisations dans leur trajectoire DEET et la stratégie
                de financement post-suppression des CEE éclairage de février 2026.
              </p>
              <p>
                <Link href="/auteur/mehdi-belkacem" className="text-primary-600 dark:text-primary-300 font-semibold">
                  Voir la page auteur complète
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Assets téléchargeables */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle badge="Téléchargements" title="Logos et photos HD" />
          <div className="grid sm:grid-cols-2 gap-4">
            {ASSETS.map((a) => (
              <a
                key={a.label}
                href={a.file}
                download={a.download}
                className="p-5 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-electric-500 flex items-center justify-center text-white shrink-0">
                  <Download className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-foreground mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                    {a.label}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{a.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-foreground-muted text-center max-w-2xl mx-auto">
            Tous les visuels sont libres d&apos;usage rédactionnel à condition de
            mentionner <strong>« S Connect France »</strong>. Pour usage commercial ou
            campagne, nous contacter.
          </p>
        </div>
      </section>

      {/* Citation rapide pour journalistes pressés */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-3xl">
          <SectionTitle badge="À copier-coller" title="Boilerplate de fin d'article" />
          <div className="p-6 rounded-2xl bg-surface-elevated border border-border">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
              « S Connect France est un artisan multi-services basé à Clichy (92) :
              électricité, contrôle d&apos;accès, serrurerie et métallerie. Fondée en 2021
              par Mehdi Belkacem, l&apos;entreprise est certifiée IRVE,
              et intervient sur toute l&apos;Île-de-France pour des particuliers, copropriétés,
              commerces et industriels. Plus d&apos;infos sur{" "}
              <Link href="/" className="text-primary-600 dark:text-primary-300 not-italic">
                sconnectfrance.fr
              </Link>
              . »
            </p>
          </div>
        </div>
      </section>

      {/* Contact presse */}
      <section className="relative py-16 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
            Contact presse
          </h2>
          <p className="text-primary-100 text-lg mb-6">
            Pour interview, citation ou demande spécifique. Réponse sous 48 h ouvrées.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="mailto:contact@sconnectfrance.fr?subject=Demande%20presse" className="btn-white btn-lg">
              <Mail className="w-5 h-5" />
              contact@sconnectfrance.fr
            </a>
            <a href="tel:+33652820685" className="btn bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-700 btn-lg transition-colors">
              <Phone className="w-5 h-5" />
              06 52 82 06 85
            </a>
          </div>
          <p className="text-primary-100/80 text-sm mt-6">
            Précisez « <em>Presse</em> » dans l&apos;objet pour traitement prioritaire.
            <Link href="/contact" className="ml-2 underline">
              Formulaire de contact
              <ChevronRight className="w-3 h-3 inline" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
