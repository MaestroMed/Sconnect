import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

/**
 * VIGIK — page créée le 24/08/2026.
 *
 * POURQUOI : « vigik » pèse 5 400 recherches/mois en France (Semrush FR,
 * difficulté 29, CPC 0,45 €) et le mot n'apparaissait NULLE PART dans le site —
 * ni dans src/, ni dans content/. C'était le plus gros volume inexploité du
 * domaine, devant « relamping » (1 900). La Search Console montrait déjà des
 * impressions parasites du type « installation de contrôle d'accès vigik … »
 * captées par des pages qui ne traitent pas le sujet.
 *
 * ANGLE — et c'est délibéré : le CPC de 0,45 € et l'intention informationnelle
 * relevée par Semrush disent que ce volume est majoritairement RÉSIDENTIEL —
 * des occupants qui cherchent ce qu'est un badge, qui en ont perdu un, ou qui
 * veulent en faire ajouter un. La page couvre donc l'exploitation courante
 * (badges, centrale, dépannage) et l'installation.
 *
 * Elle NE prend PAS pour thèse la migration VIGIK+ 2030 côté syndic : cet
 * angle est déjà tenu en Île-de-France par iefandco.com/automatisme/vigik-plus
 * (1 244 mots, H1 « le standard d'accès facteur qui remplace le VIGIK d'ici
 * 2030 »). Les deux sites appartenant au même prestataire, se disputer la même
 * requête ferait perdre les deux. L'échéance 2030 est mentionnée factuellement
 * dans la FAQ — un visiteur a le droit de l'apprendre — mais sans en faire
 * l'argument central de la page.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/services/controle-acces/vigik" },
  title: "Badge et centrale VIGIK : installation et dépannage en IDF",
  description: "Installation, dépannage et gestion de systèmes VIGIK en Île-de-France : centrale, têtes de lecture, badges résidents et accès prestataires. Intervention depuis Clichy (92). Devis gratuit.",
  keywords: ["vigik", "badge vigik", "centrale vigik", "lecteur vigik", "badge immeuble", "contrôle accès copropriété", "dépannage vigik", "badge résident", "vigik+"],
  openGraph: {
    title: "Badge et centrale VIGIK : installation et dépannage en IDF",
    description: "Centrale, têtes de lecture, badges résidents et accès prestataires. Installation et dépannage VIGIK en Île-de-France.",
    images: ["/og-image.jpg"],
  },
};

const prestations = [
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
    question: "Faut-il migrer vers VIGIK+ ?",
    answer:
      "À terme oui : l'exploitation du standard historique s'arrête au 1er janvier 2030, décision de La Poste et de l'Association VIGIK. Passé cette date, un immeuble non migré ne pourra plus recevoir les badges des facteurs, livreurs et services d'urgence. Sur des installations récentes, il est parfois possible de conserver la centrale et de ne remplacer que les têtes de lecture — un audit sur site tranche. Nous établissons le constat et le chiffrage ; la décision se prend en assemblée générale.",
  },
  {
    question: "Intervenez-vous sur une installation posée par quelqu'un d'autre ?",
    answer:
      "Oui, c'est même la majorité de nos interventions VIGIK. Nous reprenons les installations existantes quel qu'en soit l'installateur d'origine, y compris quand la documentation a été perdue — ce qui arrive souvent après un changement de syndic.",
  },
];

export default function VigikPage() {
  return (
    <ServicePageTemplate
      title="Badge et centrale VIGIK"
      subtitle="Contrôle d'accès"
      description="Installation, dépannage et gestion des systèmes VIGIK en Île-de-France : centrale, têtes de lecture, badges résidents et accès prestataires. Nous reprenons aussi les installations posées par un tiers."
      iconName="keyRound"
      category="acces"
      imageSlug="acces-badge"
      parentCategory={{ label: "Contrôle d'accès", href: "/services/controle-acces" }}
      prestations={prestations}
      faqs={faqs}
    />
  );
}
