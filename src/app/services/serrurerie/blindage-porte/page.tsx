import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Blindage de Porte | Bloc-porte blindé A2P | S Connect France",
  description: "Blindage de porte et pose de bloc-porte blindé à Clichy et Île-de-France. Certification A2P BP. Protection anti-effraction. Devis gratuit.",
};

const prestations = [
  { title: "Blindage de porte", items: ["Tôle d'acier sur porte existante", "Encadrement métallique", "Paumelles renforcées", "Serrure multipoints", "Cornières anti-pinces"] },
  { title: "Bloc-porte blindé", items: ["Porte blindée complète", "Certifié A2P BP1, BP2 ou BP3", "Sur mesure ou standard", "Large choix de finitions", "Isolation thermique et phonique"] },
  { title: "Options", items: ["Judas optique grand angle", "Entrebâilleur", "Barre de pivot", "Poignée blindée", "Cylindre haute sécurité"] },
];

const faqs = [
  { question: "Blindage ou bloc-porte blindé ?", answer: "Le blindage renforce votre porte existante, c'est moins cher mais moins performant. Le bloc-porte blindé remplace entièrement votre porte pour une sécurité maximale." },
  { question: "Combien de temps dure l'installation ?", answer: "Un blindage se fait en une demi-journée. Un bloc-porte blindé nécessite une journée complète." },
];

export default function BlindagePortePage() {
  return (
    <ServicePageTemplate
      title="Blindage de Porte"
      subtitle="Protection A2P BP"
      description="Le blindage de porte est la meilleure protection contre les effractions. Nous proposons le blindage de votre porte existante ou la pose d'un bloc-porte blindé certifié."
      iconName="zap"
      prestations={prestations}
      faqs={faqs}
    />
  );
}




