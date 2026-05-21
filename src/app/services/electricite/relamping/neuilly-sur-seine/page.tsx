import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Building2,
  TrendingUp,
  Landmark,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { NoiseOverlay } from "@/components/ui/ambient";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  generateServiceSchema,
  injectSchema,
} from "@/lib/structured-data";
import BulbText from "@/components/ui/BulbText";
import AuthorByline from "@/components/seo/AuthorByline";

// EDITORIALISED 2026-05-21 — production quality avec les spécificités de
// Neuilly : 700k m² bureaux premium, ABF sur axes classés, sièges L'Oréal,
// Dior Couture, KPMG. Update annually on market data.

export const metadata: Metadata = {
  title: "Relamping LED à Neuilly-sur-Seine — 700 k m² bureaux premium + ABF | S Connect",
  description:
    "Spécialiste relamping LED à Neuilly-sur-Seine (92200) : 700 000 m² de bureaux premium, sièges L'Oréal, Dior Couture, KPMG. Audit gratuit, accompagnement contraintes ABF sur axes classés, conformité NF EN 12464-1 et DEET 2030. Devis sous 7 jours.",
  keywords: [
    "relamping LED Neuilly",
    "électricien Neuilly-sur-Seine 92200",
    "audit éclairage bureau Neuilly",
    "relamping siège social premium Neuilly",
    "ABF éclairage Neuilly",
    "DEET Neuilly 2030",
  ],
  alternates: { canonical: "/services/electricite/relamping/neuilly-sur-seine" },
  openGraph: {
    title: "Relamping LED à Neuilly — bureaux premium et contraintes ABF",
    description:
      "700 k m² de bureaux + axes classés avec contraintes ABF. S Connect maîtrise les chantiers premium : préservation patrimoniale, IRC > 90, conformité DEET.",
    images: ["/images/locations/neuilly-sur-seine-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Neuilly-sur-Seine (92200)",
    description:
      "Audit, étude et installation relamping LED pour bureaux premium, sièges sociaux et copropriétés de Neuilly-sur-Seine. Conformité NF EN 12464-1, décret tertiaire (DEET) et contraintes ABF sur avenues classées. Certifié Qualifélec + RGE + IRVE.",
    provider: "S Connect",
    areaServed: ["Neuilly-sur-Seine", "Levallois-Perret", "Courbevoie", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingNeuillySurSeinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/neuilly-sur-seine-hero.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-55"
          aria-hidden="true"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 from-0% via-dark-950/75 via-50% to-dark-950/35 to-100%" />
        <NoiseOverlay opacity={0.04} />
        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs
              light
              items={[
                { label: "Services", href: "/services" },
                { label: "Électricité", href: "/services/electricite" },
                { label: "Relamping LED", href: "/services/electricite/relamping" },
                { label: "Neuilly-sur-Seine" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Neuilly-sur-Seine
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>700 000 m² · Sièges premium · ABF + DEET 2030</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Neuilly = 700 000 m² de bureaux les plus premium d&apos;IDF.
              Sièges <strong>L&apos;Oréal, Christian Dior Couture, KPMG, Korn
              Ferry</strong>. Contraintes ABF sur les avenues classées
              (Charles-de-Gaulle, du Roule). Notre savoir-faire : éclairage
              IRC &gt; 90 pour ne pas trahir les matériaux nobles, intégration
              luminaires conformes aux prescriptions des Architectes des
              Bâtiments de France.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demande-devis" className="btn-primary btn-lg shadow-xl shadow-primary-700/30">
                Audit gratuit
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="tel:+33652820685" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
                <Phone className="w-5 h-5" />
                06 52 82 06 85
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Neuilly en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le marché"
            title="Neuilly, l'écosystème tertiaire le plus premium hors Paris intra-muros"
            subtitle="60 000 habitants, 700 000 m² de bureaux à très forte valeur ajoutée, et 4 axes classés où le permis ABF reste obligatoire sur chaque intervention en façade."
          />
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">~700 000 m² bureaux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Loyers parmi les plus élevés du 92 (~450-500 €/m²/an HT/HC).
                Sièges sociaux haut de gamme, cabinets de conseil, sociétés
                de gestion d&apos;actifs. Très faible vacance.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Landmark className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">4 axes classés ABF</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Avenue Charles-de-Gaulle, Avenue du Roule, Boulevard du
                Château, Île de la Jatte. Modifier l&apos;éclairage en
                façade ou en vitrine = autorisation ABF préalable.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Tissu pré-2010 dominant</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Bâtiments Haussmanniens ou immeubles de bureau des années
                70-90 dans leur majorité. Source d&apos;économies LED
                massives, mais besoin d&apos;une approche soignée des
                hauteurs sous-plafond élevées.
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a
              href="https://www.insee.fr/fr/statistiques/2011101?geo=COM-92051"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              INSEE — Dossier complet Neuilly-sur-Seine
            </a>
            ,{" "}
            <a
              href="https://www.bnppre.fr/etudes-marche/marche-bureaux-paris-region.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              BNP Paribas RE — Marché bureaux 92
            </a>
            ,{" "}
            <a
              href="https://www.culture.gouv.fr/Nous-connaitre/Organisation/Services-deconcentres/Architecte-des-Batiments-de-France-ABF"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              Ministère de la Culture — Rôle ABF
            </a>
            .
          </p>
        </div>
      </section>

      {/* Spécificité ABF */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="La spécificité Neuilly"
            title="Travailler en ABF : ce que ça change pour votre relamping"
          />
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              Sur les axes classés de Neuilly, toute intervention modifiant
              l&apos;aspect extérieur du bâtiment passe par l&apos;avis de
              l&apos;<strong>Architecte des Bâtiments de France</strong> (ABF).
              Pour un relamping LED, trois situations engagent l&apos;ABF :
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
                <span>
                  <strong>Éclairage de façade extérieure</strong> (enseigne
                  lumineuse, projecteur d&apos;éclairement architectural) :
                  température de couleur, intensité et orientation sont
                  prescrits par l&apos;ABF pour préserver l&apos;ambiance
                  nocturne du quartier classé.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
                <span>
                  <strong>Éclairage de vitrine</strong> visible depuis la rue :
                  IRC ≥ 90 + flicker-free imposés sur certains axes pour ne
                  pas dénaturer la matière (boiseries, dorures, vitrines
                  patrimoniales).
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
                <span>
                  <strong>Intégration des luminaires</strong> dans halls
                  ou paliers communs en partie haute de l&apos;immeuble :
                  encastrement préféré, formes contemporaines vetoées sur
                  bâti classé.
                </span>
              </li>
            </ul>
            <p className="leading-relaxed">
              Notre méthode sur axes classés : <strong>pré-validation
              informelle</strong> avec l&apos;ABF Hauts-de-Seine avant
              le dépôt du dossier, étude photométrique annexée au dossier
              de demande, recours systématique aux luminaires de fabricants
              qui disposent déjà d&apos;antériorité ABF (Modular, Trilux
              Saturn, Targetti gamme Heritage). Délai moyen ABF : 4 à 8
              semaines selon la charge.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi nous à Neuilly */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à Neuilly"
            title="Le mariage de la rigueur tertiaire et du respect patrimonial"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Voisinage immédiat",
                desc: "Clichy → Neuilly via la Porte de Champerret en 18 min. Audit sous 48h, SAV sous 24h.",
              },
              {
                title: "Maîtrise des contraintes ABF",
                desc: "Dossiers ABF de relamping LED traités sur les avenues Roule et Charles-de-Gaulle depuis 5 ans.",
              },
              {
                title: "Luminaires premium",
                desc: "Trilux gamme architecturale, Philips Hue Premium, Modular, Targetti Heritage. Spécification haut de gamme cohérente avec votre image.",
              },
              {
                title: "IRC ≥ 90 systématique",
                desc: "Bois précieux, marbres, dorures : un LED IRC 80 trahit. Nous spécifions IRC ≥ 90 en standard sur Neuilly.",
              },
              {
                title: "Devis ferme = facture finale",
                desc: "Aucun supplément après mise en service. Mesures luxmètre étalonné, modèle ROI sous 7 jours.",
              },
              {
                title: "Continuité d'exploitation",
                desc: "Cabinets de conseil, sièges premium : intervention en nuit/weekend obligatoire. Sécurité incendie maintenue.",
              },
            ].map((b) => (
              <li key={b.title} className="p-5 rounded-2xl bg-surface-elevated border border-border">
                <h3 className="font-display font-bold text-foreground mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  {b.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{b.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Typologies Neuilly */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Selon votre typologie"
            title="Spécificités relamping par configuration"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/services/electricite/relamping/bureau-tertiaire"
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Cabinet conseil / banque privée
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Bureaux fermés haute QVT + salles de comité + accueil
                premium. Tunable white sur salles client (3000K confidentiel
                vs 4000K travail). IRC ≥ 90 sur l&apos;accueil. Budget
                40-60 €/m² pour le standing demandé.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/commerce-restaurant"
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Boutique premium Avenue du Roule
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Mode, joaillerie, art de la table. Éclairage d&apos;accentuation
                IRC ≥ 95 + 3000K chaud pour rendre les matières. Validation
                ABF nécessaire sur vitrine. Budget 80-150 €/m² selon le
                niveau de personnalisation.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/copropriete-parking"
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Copropriété Haussmannienne
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Halls dorés, paliers à boiseries, escaliers de service.
                Préservation des appliques d&apos;époque + ajout LED
                discrètes. Détection présence + gradation crépusculaire.
                Validation conseil syndical + AG.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/industriel-entrepot"
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Restaurant & espace événementiel
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Restaurants étoilés + espaces de réception. Scénarisation
                lumière complète DALI (déjeuner d&apos;affaires vs dîner
                gastro), IRC ≥ 95 obligatoire, flicker-free pour le
                confort visuel sur les longues soirées.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-link pillar */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-3xl text-center">
          <Lightbulb className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Notre méthode relamping complète
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Audit photométrique, calcul ROI, gestion DALI, conformité décret
            tertiaire, validation ABF si nécessaire. Tout est détaillé sur la
            page pilier.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/services/electricite/relamping" className="btn-outline">
              Voir la page pilier Relamping LED
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calculateur-relamping" className="btn-outline">
              Calculer mon ROI
            </Link>
          </div>
        </div>
      </section>

      {/* Author byline — E-E-A-T signal avant le CTA */}
      <section className="bg-surface py-10 md:py-14">
        <div className="container-custom max-w-3xl">
          <AuthorByline variant="card" />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Auditons votre éclairage à Neuilly gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Audit sous 48h + dossier ABF pré-validé si nécessaire.
              Rapport DEET sous 7 jours. Sans engagement.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/demande-devis" className="btn-white btn-lg">
              Demander un audit
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33652820685" className="btn bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-700 btn-lg transition-colors">
              <Phone className="w-5 h-5" />
              06 52 82 06 85
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
