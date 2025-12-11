import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Remplacement de Serrure | Serrures A2P | S Connect France",
  description: "Changement de serrure à Clichy et Île-de-France. Serrures haute sécurité certifiées A2P. Fichet, Vachette, Bricard. Devis gratuit.",
};

const prestations = [
  { title: "Types de serrures", items: ["Serrures à cylindre européen", "Serrures multipoints (3, 5, 7 points)", "Serrures carénées", "Serrures connectées", "Verrous et targettes"] },
  { title: "Certifications", items: ["Serrures A2P* (5 min résistance)", "Serrures A2P** (10 min résistance)", "Serrures A2P*** (15 min résistance)", "Cylindres haute sécurité", "Clés protégées et brevetées"] },
  { title: "Marques installées", items: ["Fichet", "Vachette", "Bricard", "Pollux", "Mul-T-Lock"] },
];

const faqs = [
  { question: "Qu'est-ce qu'une serrure A2P ?", answer: "A2P est une certification qui garantit la résistance à l'effraction. Plus il y a d'étoiles (1 à 3), plus la serrure résiste longtemps." },
  { question: "Dois-je changer toute la serrure ou juste le cylindre ?", answer: "Souvent, le changement du cylindre suffit et coûte moins cher. Nous évaluons l'état de votre serrure et vous conseillons la meilleure option." },
];

export default function RemplacementSerrurePage() {
  return (
    <ServicePageTemplate
      title="Remplacement de Serrure"
      subtitle="Haute sécurité A2P"
      description="Après un cambriolage, une perte de clés ou pour renforcer votre sécurité, nous remplaçons votre serrure par un modèle adapté. Large choix de marques certifiées."
      iconName="zap"
      prestations={prestations}
      faqs={faqs}
    />
  );
}




