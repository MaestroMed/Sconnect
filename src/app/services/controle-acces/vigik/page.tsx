import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

/**
 * VIGIK — page créée le 24/08/2026.
 *
 * POURQUOI : « vigik » pèse 5 400 recherches/mois en France (Semrush FR,
 * difficulté 29) et le mot n'apparaissait NULLE PART dans le site — ni dans
 * src/, ni dans content/. C'est le plus gros volume inexploité du domaine,
 * devant « relamping » (1 900). La Search Console montrait déjà des
 * impressions parasites du type « installation de contrôle d'accès vigik … »
 * captées par des pages qui ne traitent pas le sujet.
 *
 * DEUX INTENTIONS, UNE PAGE. Le volume brut est informationnel et résidentiel
 * (un occupant qui a perdu son badge, qui veut en faire ajouter un) — d'où le
 * CPC bas de 0,45 €. La valeur commerciale, elle, est côté gestionnaire : la
 * migration VIGIK+ avant le 1er janvier 2030 est une dépense votée en
 * assemblée générale, sur un parc entier. La page sert les deux : exploitation
 * courante en haut, échéance 2030 et décision de copropriété en bas.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/services/controle-acces/vigik" },
  title: "VIGIK et migration VIGIK+ 2030 — installation et dépannage IDF",
  description: "Installation, dépannage et migration VIGIK+ en Île-de-France. L'exploitation du VIGIK historique s'arrête le 1er janvier 2030 : audit du parc, chiffrage pour l'assemblée générale, remplacement des têtes de lecture ou de la centrale. Intervention depuis Clichy (92).",
  keywords: ["vigik", "badge vigik", "vigik+", "migration vigik 2030", "centrale vigik", "lecteur vigik", "badge immeuble", "contrôle accès copropriété", "dépannage vigik", "badge résident"],
  openGraph: {
    title: "VIGIK et migration VIGIK+ 2030 — installation et dépannage IDF",
    description: "Le VIGIK historique s'arrête le 1er janvier 2030. Audit, chiffrage pour l'AG, migration des têtes de lecture. Installation et dépannage en Île-de-France.",
    images: ["/og-image.jpg"],
  },
};

const prestations = [
  {
    title: "Migration VIGIK+ avant 2030",
    items: [
      "Relevé de l'existant : centrale, têtes de lecture, badges en circulation",
      "Diagnostic de ce qui est conservable",
      "Chiffrage détaillé pour l'assemblée générale",
      "Remplacement des têtes de lecture ou de la centrale",
      "Réencodage des badges résidents si nécessaire",
    ],
  },
  {
    title: "Installation et mise en service",
    items: [
      "Pose de la centrale en partie commune",
      "Têtes de lecture en façade et en local vélos/poubelles",
      "Raccordement à la gâche et à l'interphone existant",
      "Paramétrage des services prestataires autorisés",
      "Remise du dossier d'exploitation au gestionnaire",
    ],
  },
  {
    title: "Badges et gestion des accès",
    items: [
      "Encodage des badges résidents",
      "Ajout et suppression à l'arrivée ou au départ d'un occupant",
      "Blocage immédiat d'un badge perdu ou volé",
      "Plages horaires par porte et par service",
      "Formation du gardien ou du conseil syndical",
    ],
  },
  {
    title: "Dépannage et maintenance",
    items: [
      "Centrale qui ne reconnaît plus les badges",
      "Tête de lecture hors service ou vandalisée",
      "Reprise d'installation posée par un tiers",
      "Remplacement de pile de sauvegarde",
      "Contrat de maintenance annuel",
    ],
  },
];

const faqs = [
  {
    question: "Qu'est-ce qu'un badge VIGIK exactement ?",
    answer:
      "VIGIK est un standard d'accès aux parties communes créé par La Poste en 1996. Il repose sur trois éléments : un badge sans contact, une tête de lecture en façade, et une centrale installée à l'intérieur de l'immeuble qui décide de l'ouverture. Son intérêt tient à une idée simple — le badge d'un prestataire ne contient pas une clé permanente, mais une autorisation qui expire d'elle-même.",
  },
  {
    question: "Combien de temps le badge d'un facteur reste-t-il valide ?",
    answer:
      "Très peu : de quelques heures à trois jours selon le service. Le prestataire doit recharger son badge auprès de son employeur pour continuer à entrer. C'est ce qui distingue VIGIK d'un passe classique : un badge perdu dans la rue devient inutilisable de lui-même en quelques heures, sans que personne n'ait à intervenir sur l'immeuble.",
  },
  {
    question: "J'ai perdu mon badge résident, que se passe-t-il ?",
    answer:
      "Le badge résident, lui, n'expire pas — il faut donc le désactiver dans la centrale, puis en encoder un nouveau. C'est une intervention courte, faite sur place. Signalez-le à votre syndic ou à votre gardien : tant que le badge perdu reste actif, il ouvre la porte.",
  },
  {
    question: "Peut-on copier un badge VIGIK ?",
    answer:
      "Les badges résidents des installations anciennes reposent sur la technologie MIFARE Classic, dont le chiffrement est aujourd'hui cassé — la copie est techniquement à la portée de n'importe quelle boutique équipée. C'est précisément ce que corrigent les générations plus récentes, qui utilisent des puces DESFire. Si votre immeuble a plus de dix ans et que les badges se dupliquent en boutique, l'installation mérite un audit.",
  },
  {
    question: "Comment ajoute-t-on un badge pour un nouvel occupant ?",
    answer:
      "L'encodage se fait sur la centrale, badge par badge. Nous intervenons à la demande du syndic ou du bailleur, ou nous formons le gardien pour qu'il le fasse lui-même sur les installations qui le permettent — c'est souvent plus rapide et moins cher à l'année qu'un déplacement à chaque emménagement.",
  },
  {
    question: "Ma centrale ne reconnaît plus aucun badge, d'où ça vient ?",
    answer:
      "Trois causes couvrent la grande majorité des cas : la pile de sauvegarde de la centrale est morte et la base des autorisations a été perdue, une coupure secteur a laissé l'équipement dans un état incohérent, ou la tête de lecture est hors service. Le diagnostic se fait sur place en une intervention ; la remise en service dépend de la cause, mais une perte de base impose de réencoder les badges résidents.",
  },
  {
    question: "Que se passe-t-il exactement au 1er janvier 2030 ?",
    answer:
      "L'exploitation du standard VIGIK historique cesse définitivement — c'est une décision de La Poste et de l'Association VIGIK, pas un texte réglementaire, mais l'effet est le même. Passé cette date, les badges des facteurs, livreurs, relevés de compteurs et services d'urgence cesseront de fonctionner sur un immeuble non migré. Concrètement, le courrier ne rentre plus.",
  },
  {
    question: "La migration VIGIK+ est-elle obligatoire ?",
    answer:
      "Aucune loi ne l'impose. Mais un immeuble qui ne migre pas se retrouve simplement inaccessible aux services qui en dépendent, ce qui n'est pas une option tenable pour un gestionnaire. La bonne question n'est donc pas s'il faut migrer, mais quand — et à quel coût, ce qui dépend entièrement de l'âge de l'installation existante.",
  },
  {
    question: "Faut-il tout remplacer, ou seulement une partie ?",
    answer:
      "Cela dépend de l'installation. Sur un parc récent, il est fréquent de pouvoir conserver la centrale et de ne remplacer que les têtes de lecture — la facture n'a alors rien à voir avec un remplacement complet. Sur une installation ancienne, la centrale suit. Seul un relevé sur site permet de trancher, et c'est la première chose que nous faisons.",
  },
  {
    question: "Les résidents devront-ils changer de badge ?",
    answer:
      "Le plus souvent non. La migration concerne l'accès des prestataires, pas celui des occupants. Beaucoup de badges résidents sont déjà au standard DESFire et restent compatibles ; quand ce n'est pas le cas, un réencodage coûte quelques euros par badge. C'est un point qui rassure en assemblée générale, parce que la crainte d'avoir à rééquiper cent logements fait souvent capoter le vote.",
  },
  {
    question: "Comment se vote la migration en copropriété ?",
    answer:
      "En assemblée générale, sur proposition du syndic. Selon le montant et la nature des travaux, le vote relève de l'article 24 ou de l'article 25 de la loi de 1965. Nous fournissons le dossier exploitable en AG : état des lieux de l'existant, ce qui est conservable, chiffrage détaillé et planning. Plus le vote est tardif, plus les carnets d'installateurs se remplissent à l'approche de l'échéance.",
  },
  {
    question: "Intervenez-vous sur une installation posée par quelqu'un d'autre ?",
    answer:
      "Oui, c'est même la majorité de nos interventions VIGIK. Nous reprenons les installations existantes quel qu'en soit l'installateur d'origine, y compris quand la documentation a été perdue — ce qui arrive souvent après un changement de syndic.",
  },
];

/** Bloc échéance 2030 — rendu entre la FAQ et le CTA final via extraContent. */
function Migration2030() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom max-w-4xl">
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-8 dark:border-amber-500/40 dark:bg-amber-500/10">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-amber-800 dark:text-amber-300">
            Échéance — 1<sup>er</sup> janvier 2030
          </span>
          <h2 className="font-display mt-2 mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Le VIGIK historique s&apos;arrête. Pas l&apos;immeuble.
          </h2>
          <p className="mb-4 leading-relaxed text-foreground-muted">
            La Poste et l&apos;Association VIGIK ont fixé la fin d&apos;exploitation
            du standard historique au 1<sup>er</sup> janvier 2030. Aucune loi ne
            contraint personne à migrer — mais un immeuble qui ne l&apos;a pas fait
            cesse simplement d&apos;être accessible aux facteurs, aux livreurs, aux
            relevés de compteurs et aux services d&apos;urgence. Le courrier ne rentre
            plus. C&apos;est le genre de sujet qui se règle en assemblée générale
            longtemps avant l&apos;échéance, ou dans l&apos;urgence après.
          </p>
          <p className="mb-6 leading-relaxed text-foreground-muted">
            La raison technique est simple : les installations historiques
            reposent sur des badges MIFARE Classic, dont le chiffrement est
            cassé depuis des années — n&apos;importe quelle boutique équipée les
            duplique. VIGIK+ repose sur des puces DESFire, qui ferment cette porte.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Ce qui est souvent conservable",
                d: "Sur un parc récent, la centrale reste en place et seules les têtes de lecture changent. La facture n'a alors rien à voir avec un remplacement complet.",
              },
              {
                t: "Ce qui ne bouge pas",
                d: "Les badges résidents, dans la plupart des cas. Beaucoup sont déjà en DESFire ; sinon un réencodage coûte quelques euros par badge.",
              },
              {
                t: "Ce qu'on vous remet",
                d: "Un état des lieux de l'existant, ce qui est conservable, un chiffrage détaillé et un planning — le dossier exploitable tel quel en AG.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-display mb-2 font-bold text-foreground">{c.t}</h3>
                <p className="text-sm leading-relaxed text-foreground-muted">{c.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-foreground-muted">
            Le relevé sur site est gratuit et sans engagement. C&apos;est lui qui
            détermine si vous êtes dans le cas simple ou dans le cas lourd — et il
            n&apos;y a aucun moyen de le savoir sur plan.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function VigikPage() {
  return (
    <ServicePageTemplate
      title="VIGIK et migration VIGIK+"
      subtitle="Contrôle d'accès"
      description="Installation, dépannage et migration des systèmes VIGIK en Île-de-France : centrale, têtes de lecture, badges résidents et accès prestataires. L'exploitation du standard historique s'arrête le 1er janvier 2030 — nous établissons l'état des lieux et le chiffrage pour votre assemblée générale."
      iconName="keyRound"
      category="acces"
      imageSlug="acces-badge"
      parentCategory={{ label: "Contrôle d'accès", href: "/services/controle-acces" }}
      prestations={prestations}
      faqs={faqs}
      extraContent={<Migration2030 />}
    />
  );
}
