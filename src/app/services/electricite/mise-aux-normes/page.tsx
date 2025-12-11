import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Mise aux Normes Électriques | NF C 15-100 | S Connect France",
  description: "Mise en conformité électrique NF C 15-100 à Clichy et Île-de-France. Diagnostic, mise à la terre, protections différentielles. Devis gratuit.",
};

const prestations = [
  { title: "Diagnostic électrique", items: ["Contrôle visuel de l'installation", "Tests des protections différentielles", "Vérification de la mise à la terre", "Mesure de l'isolement des circuits", "Rapport détaillé avec préconisations"] },
  { title: "Mise en conformité tableau", items: ["Remplacement du tableau électrique", "Installation disjoncteurs divisionnaires", "Mise en place interrupteurs différentiels", "Étiquetage et repérage des circuits", "Certificat de conformité Consuel"] },
  { title: "Protections", items: ["Interrupteurs différentiels 30mA", "Disjoncteurs calibrés", "Parafoudre", "Coupe-circuit d'urgence", "Protection des personnes et des biens"] },
];

const faqs = [
  { question: "Comment savoir si mon installation est aux normes ?", answer: "Un diagnostic électrique par un professionnel permet de vérifier la conformité. Les signes d'alerte : tableau avec fusibles, pas de différentiel 30mA, prises sans terre." },
  { question: "La mise aux normes est-elle obligatoire ?", answer: "Elle est obligatoire lors de la vente d'un logement de plus de 15 ans et pour la location. Elle est fortement recommandée pour votre sécurité." },
  { question: "Qu'est-ce que la norme NF C 15-100 ?", answer: "C'est la norme française régissant les installations électriques basse tension. Elle définit les règles de sécurité : nombre minimal de prises, protections, etc." },
];

export default function MiseAuxNormesPage() {
  return (
    <ServicePageTemplate
      title="Mise aux Normes"
      subtitle="Conformité NF C 15-100"
      description="Votre installation électrique a plus de 15 ans ? Elle n'est probablement plus aux normes actuelles. Nous réalisons le diagnostic et les travaux de mise en conformité."
      iconName="fileCheck"
      prestations={prestations}
      faqs={faqs}
    />
  );
}




