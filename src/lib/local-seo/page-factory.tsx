import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Phone, MapPin, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  getCommune,
  publishedCommunes,
  isPublished,
  isIndexableCommune,
  indexableCommunes,
  deptNom,
  type Commune,
} from "./communes";
import { requireService, localHref, SERVICES, type LocalService } from "./services";
import { popText, distanceText, interventionPhrase, parcText, densiteText } from "./descriptors";
import { getLocalContext } from "./local-context";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const PHONE = "06 52 82 06 85";
const PHONE_TEL = "+33652820685";
const nf = new Intl.NumberFormat("fr-FR");

interface RouteParams {
  params: Promise<{ commune: string }>;
}

export function makeLocalService(serviceKey: string) {
  const service = requireService(serviceKey);

  // Pré-génère au BUILD uniquement les grandes communes (tier A ≥ 50k) —
  // sinon générer 4500 pages statiques sature la mémoire du build Vercel.
  // Le reste (tier B/C/D) est rendu À LA DEMANDE (ISR, dynamicParams=true)
  // puis mis en cache : toutes les communes restent servies en 200, mais le
  // build reste léger et rapide.
  function generateStaticParams() {
    return publishedCommunes()
      .filter((c) => c.tier === "A")
      .map((c) => ({ commune: c.slug }));
  }

  async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
    const { commune: slug } = await params;
    const c = getCommune(slug);
    // Slug inconnu → noindex explicite (le rendu ISR renvoie 200 « soft-404 » ;
    // au moins Google ne l'indexe pas).
    if (!c || !isPublished(c)) return { title: "Page introuvable", robots: { index: false, follow: false } };
    // ANTI-CANNIBALISATION : si la ville possède une page artisanale
    // /services/** (cluster relamping), la page usine se déclare duplicata en
    // pointant son canonical (et og:url) vers elle — un seul candidat au
    // ranking sur « service + ville », les signaux se consolident.
    const handcrafted = service.handcrafted?.[c.slug];
    return buildMetadata({
      title: `${service.nom} à ${c.nom} (${c.cp})`,
      description: `${service.nom} à ${c.nom} : ${service.accroche} Intervention depuis Clichy (${c.interventionMin} min), devis gratuit. S Connect, artisan en ${deptNom(c.dept)}.`,
      path: handcrafted ?? `/${service.key}/${c.slug}`,
      image: service.image,
      imageAlt: service.imageAlt(c),
      // ANTI-DÉSINDEXATION : indexé ⟺ la commune possède un contexte local réel
      // et unique (cf. isIndexableCommune). La longue traîne non enrichie reste
      // servie (ISR, 200) pour le trafic direct/pub mais en noindex tant que le
      // contenu n'est pas ≥60% unique — sinon le ratio de pages minces risque une
      // démotion SITEWIDE (Core Update du 21 mai 2026 sur le programmatique à
      // faible variation). Enrichir une commune l'indexe automatiquement.
      // Cas handcrafted : jamais noindex — le canonical fait la consolidation,
      // combiner les deux signaux serait contradictoire.
      noindex: handcrafted ? false : !isIndexableCommune(c),
      keywords: [
        `${service.nom.toLowerCase()} ${c.nom}`,
        `${service.nomMetier} ${c.nom}`,
        `${service.nom.toLowerCase()} ${c.cp}`,
        `${service.nomMetier} ${deptNom(c.dept)}`,
      ],
    });
  }

  async function Page({ params }: RouteParams) {
    const { commune: slug } = await params;
    const c = getCommune(slug);
    if (!c || !isPublished(c)) notFound();
    return <LocalServiceView service={service} c={c} />;
  }

  return {
    generateStaticParams,
    generateMetadata,
    Page,
    dynamicParams: true as const, // longue traîne rendue à la demande (ISR)
    revalidate: 604800, // 7 jours
  };
}

// ---- HUB de service : /[service] = ANNUAIRE des communes desservies ----
// ANTI-CANNIBALISATION (décision du 5 août 2026) : le hub ne porte AUCUN
// contenu commercial — ni prestations, ni argumentaire — pour ne pas
// concurrencer la page pilier /services/** sur la requête générique. Son rôle :
// (1) annuaire de communes (maillage vers les pages locales), (2) renvoi
// explicite vers la page service complète.
export function makeServiceHub(serviceKey: string) {
  const service = requireService(serviceKey);

  const metadata: Metadata = buildMetadata({
    title: `${service.nom} : communes desservies en Île-de-France`,
    description: `Toutes les communes où S Connect intervient pour ${service.nom.toLowerCase()} en Île-de-France, depuis Clichy (92). Temps d'intervention et page locale dédiée par commune.`,
    path: `/${service.key}`,
    image: service.image,
  });

  function Page() {
    // Hub : ne lister que les communes INDEXABLES (enrichies) — sinon les liens
    // par hub dépassent le plafond raisonnable et diluent le crawl vers des
    // pages noindex. La longue traîne reste accessible par URL directe.
    const communes = indexableCommunes();
    const byDept = new Map<string, Commune[]>();
    for (const c of communes) {
      if (!byDept.has(c.dept)) byDept.set(c.dept, []);
      byDept.get(c.dept)!.push(c);
    }
    const depts = [...byDept.keys()].sort();
    return (
      <>
        <section className="relative bg-dark-950 text-white overflow-hidden">
          <Image src={service.image} alt={`${service.nom} en Île-de-France par S Connect`} fill priority sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-dark-950/40" />
          <div className="container-custom relative py-14 md:py-20">
            <Breadcrumbs light items={[{ label: service.nom }]} />
            <h1 className="font-display font-bold text-3xl md:text-5xl mt-6 mb-4">
              {service.nom} : communes desservies en Île-de-France
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-6">
              Intervention depuis Clichy (92) dans {communes.length} communes. Trouvez la vôtre
              ci-dessous, ou consultez la page complète du service.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={service.servicePage} className="btn-primary btn-lg">
                Tout sur {service.nom.toLowerCase()} <ChevronRight className="w-5 h-5" />
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn glass-panel text-white hover:bg-white/15 btn-lg">
                <Phone className="w-5 h-5" /> {PHONE}
              </a>
            </div>
          </div>
        </section>
        <section className="section-padding">
          <div className="container-custom max-w-5xl">
            {/* Renvoi pilier : le contenu commercial (prestations, prix, méthode)
                vit sur /services/** — pas ici. */}
            <Link
              href={service.servicePage}
              className="flex items-start gap-3 p-5 mb-10 rounded-xl border border-primary-300 dark:border-primary-500/40 bg-primary-50 dark:bg-primary-500/10 hover:border-primary-500 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
              <span className="text-foreground">
                <span className="font-semibold">{service.nom} — la page complète</span>{" "}
                <span className="text-foreground-muted">
                  : prestations, méthode, prix et FAQ. Cette page-ci est l'annuaire des communes desservies.
                </span>
              </span>
            </Link>
            <p className="text-lg text-foreground-muted leading-relaxed mb-8">
              S Connect intervient depuis son atelier de Clichy (92) dans toute l'Île-de-France.
              Chaque commune ci-dessous a sa page dédiée : temps d'intervention réel, contexte
              local et demande de devis.
            </p>
            {depts.map((d) => (
              <div key={d} className="mb-8">
                <h2 className="font-display font-bold text-xl mb-3">{deptNom(d)} ({d})</h2>
                <div className="flex flex-wrap gap-2">
                  {byDept.get(d)!.sort((a, b) => b.population - a.population).map((c) => (
                    <Link key={c.slug} href={localHref(service, c.slug)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-muted border border-border text-sm hover:border-primary-400 hover:text-primary-600 transition-colors">
                      <MapPin className="w-3.5 h-3.5" /> {c.nom}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  return { metadata, Page };
}

function LocalServiceView({ service, c }: { service: LocalService; c: Commune }) {
  const faqs = service.faq(c);
  const ctx = getLocalContext(c.slug);
  // Page artisanale /services/** couvrant déjà cette ville : le canonical
  // pointe dessus (cf. generateMetadata) et on l'affiche en bandeau.
  const handcrafted = service.handcrafted?.[c.slug];
  const otherServices = SERVICES.filter(
    (s) => s.key !== service.key && (s.metier === service.metier || s.intent === service.intent),
  ).slice(0, 4);
  // Ne lier que vers des communes INDEXABLES (enrichies) : un lien interne
  // vers une page publiée mais noindex gaspille le crawl et dilue le maillage
  // (et un slug non publié serait carrément un 404).
  const nearby = c.nearby.filter((n) => {
    const nc = getCommune(n.slug);
    return nc && isIndexableCommune(nc);
  });

  // UNE entité LocalBusiness canonique pour tout le site (déclarée dans
  // layout.tsx, @id /#localbusiness). Chaque page émet un Service qui la
  // RÉFÉRENCE, au lieu de déclarer 4660 LocalBusiness distincts (signal de
  // spam à l'échelle). FAQPage conservé comme signal (le rich result FAQ est
  // mort depuis le 7 mai 2026, mais reste lu par les moteurs IA).
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE}/${service.key}/${c.slug}#service`,
        name: `${service.nom} à ${c.nom}`,
        serviceType: service.nom,
        description: `${service.nom} à ${c.nom} (${c.cp}) et dans tout le ${deptNom(c.dept)}. ${service.accroche}`,
        url: `${SITE}/${service.key}/${c.slug}`,
        areaServed: { "@type": "City", name: c.nom, postalCode: c.cp },
        provider: { "@id": `${SITE}/#localbusiness` },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />

      {/* Hero */}
      <section className="relative bg-dark-950 text-white overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt(c)}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-dark-950/40" />
        <div className="container-custom relative py-14 md:py-20">
          <Breadcrumbs
            light
            items={[
              { label: service.nom, href: `/${service.key}` },
              { label: `${c.nom} (${c.cp})` },
            ]}
          />
          <h1 className="font-display font-bold text-3xl md:text-5xl mt-6 mb-4 leading-tight">
            {service.nom} à {c.nom}
            <span className="text-primary-400"> ({c.cp})</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-6">{service.accroche}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-400" /> {distanceText(c)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-400" /> {interventionPhrase(c)}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href={`tel:${PHONE_TEL}`} className="btn-primary btn-lg">
              <Phone className="w-5 h-5" /> {service.intent === "urgence" ? PHONE : service.ctaLabel}
            </a>
            <Link href="/demande-devis" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
              Devis gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* Bandeau vers la page artisanale quand la ville en a une : c'est ELLE
          le pilier (canonical), on y route les visiteurs et le maillage. */}
      {handcrafted && (
        <section className="pt-10">
          <div className="container-custom max-w-3xl">
            <Link
              href={handcrafted}
              className="flex items-start gap-3 p-5 rounded-xl border border-primary-300 dark:border-primary-500/40 bg-primary-50 dark:bg-primary-500/10 hover:border-primary-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
              <span className="text-foreground">
                <span className="font-semibold">Page complète : {service.nom} à {c.nom}</span>{" "}
                <span className="text-foreground-muted">
                  — méthode, prix, références chantiers et FAQ détaillée.
                </span>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Intro différenciée */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <p className="text-lg text-foreground-muted leading-relaxed">{service.intro(c)}</p>
        </div>
      </section>

      {/* Prestations */}
      <section className="pb-14">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">
            {service.nom} à {c.nom} : nos prestations
          </h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {service.prestations.map((p) => (
              <li key={p} className="flex items-start gap-3 p-4 rounded-xl bg-surface-muted border border-border">
                <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pourquoi nous à cette commune — données réelles */}
      <section className="pb-14">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">
            Pourquoi choisir S Connect à {c.nom} ?
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <Stat value={`${c.interventionMin} min`} label={`Intervention depuis Clichy`} />
            <Stat value={nf.format(c.population)} label="habitants desservis" />
            <Stat value={`${String(c.distanceKm).replace(".", ",")} km`} label="de notre atelier" />
          </div>
          <p className="text-foreground-muted leading-relaxed mb-4">
            {c.nom} compte {popText(c)}{c.densite ? ` (${densiteText(c)})` : ""} et se caractérise
            par {parcText(c)}. Nos équipes couvrent l'ensemble de la commune ({c.cp}) et du{" "}
            {deptNom(c.dept)} — {distanceText(c)}, nous assurons {interventionPhrase(c)} et un devis
            clair, sans surprise sur la facture.
          </p>
          <ul className="space-y-2">
            {service.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2 text-foreground-muted">
                <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contexte local RÉEL (recherché par commune) — le contenu unique qui
          fait passer la page au-dessus du seuil de qualité. N'apparaît que si
          la commune a été enrichie. */}
      {ctx && (
        <section className="pb-14">
          <div className="container-custom max-w-3xl">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">
              {service.nom} à {c.nom} : le terrain
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">{ctx.paragraphe}</p>
            {ctx.angle && (
              <p className="text-foreground-muted leading-relaxed mb-4">{ctx.angle}</p>
            )}
            {ctx.zones && ctx.zones.length > 0 && (
              <p className="text-foreground-muted leading-relaxed mb-4">
                <span className="font-semibold text-foreground">Zones et quartiers desservis à {c.nom} :</span>{" "}
                {ctx.zones.join(", ")}.
              </p>
            )}
            {ctx.transports && (
              <p className="text-foreground-muted leading-relaxed">
                <span className="font-semibold text-foreground">Accès :</span> {ctx.transports}
              </p>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="pb-14">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">
            Questions fréquentes — {service.nom} à {c.nom}
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-surface p-5">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between gap-4">
                  {f.q}
                  <ChevronRight className="w-5 h-5 text-primary-500 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-foreground-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage : même service dans les communes limitrophes + autres services ici */}
      <section className="pb-14">
        <div className="container-custom max-w-4xl grid md:grid-cols-2 gap-8">
          {nearby.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-xl mb-4">
                {service.nom} près de {c.nom}
              </h2>
              <ul className="space-y-2">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={localHref(service, n.slug)}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <MapPin className="w-4 h-4" /> {service.nom} à {n.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h2 className="font-display font-bold text-xl mb-4">Nos autres services à {c.nom}</h2>
            <ul className="space-y-2">
              {otherServices.map((s) => (
                <li key={s.key}>
                  <Link
                    href={localHref(s, c.slug)}
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
                  >
                    <ChevronRight className="w-4 h-4" /> {s.nom} à {c.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-primary-600 text-white">
        <div className="container-custom py-12 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
            {service.nom} à {c.nom} — parlons de votre projet
          </h2>
          <p className="text-primary-100 mb-6">{service.infoDelai} · {service.infoPrix}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${PHONE_TEL}`} className="btn bg-white text-primary-700 hover:bg-primary-50 btn-lg">
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
            <Link href="/demande-devis" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-surface-elevated border border-border p-5 text-center">
      <div className="font-display font-bold text-2xl text-primary-600">{value}</div>
      <div className="text-sm text-foreground-muted mt-1">{label}</div>
    </div>
  );
}
