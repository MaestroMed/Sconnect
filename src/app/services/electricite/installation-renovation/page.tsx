import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Installation & Rénovation Électrique | S'Connect",
  description: "Installation et rénovation électrique complète en Île-de-France. Création de réseaux, tableaux électriques, éclairage LED, prises, bornes de recharge. Devis gratuit, intervention rapide.",
  keywords: ["installation électrique", "rénovation électrique", "tableau électrique", "éclairage LED", "borne recharge", "électricien installation", "mise en service électrique"],
  openGraph: {
    title: "Installation & Rénovation Électrique | S'Connect",
    description: "Installation et rénovation électrique complète : réseaux, tableaux, éclairage. Intervention en Île-de-France.",
    images: ["/og-image.jpg"],
  },
};

const prestations = [
  { title: "Installation neuve", items: ["Création de réseau électrique complet", "Installation de tableaux électriques", "Pose de prises et interrupteurs", "Mise en place de circuits spécialisés", "Raccordement au réseau ENEDIS"] },
  { title: "Rénovation électrique", items: ["Remplacement de l'installation existante", "Modernisation du tableau électrique", "Passage en encastré ou apparent", "Ajout de circuits supplémentaires", "Upgrade de puissance"] },
  { title: "Éclairage", items: ["Éclairage intérieur LED", "Spots encastrés et appliques", "Éclairage extérieur et jardin", "Variateurs et détecteurs de présence", "Éclairage architectural"] },
  { title: "Équipements spécifiques", items: ["Bornes de recharge véhicules électriques", "Alimentation piscine et spa", "Circuits cuisine professionnelle", "Prises USB et multimédia", "Volets roulants électriques"] },
];

const faqs = [
  { question: "Combien coûte une installation électrique complète ?", answer: "Le prix dépend de la surface et du niveau de finition. Comptez entre 80€ et 150€/m² pour une installation standard. Nous établissons un devis détaillé gratuit après visite." },
  { question: "Faut-il refaire toute l'électricité lors d'une rénovation ?", answer: "Pas nécessairement. Après diagnostic, nous pouvons déterminer si une rénovation partielle suffit ou si une refonte totale est préférable." },
  { question: "Combien de temps dure une installation électrique ?", answer: "Pour un appartement de 60-80m², comptez 3 à 5 jours ouvrés. Une rénovation partielle peut se faire en 1 à 2 jours." },
];

export default function InstallationRenovationPage() {
  return (
    <ServicePageTemplate
      title="Installation & Rénovation"
      subtitle="Électrique"
      description="Que vous construisiez neuf ou rénoviez votre bien, nos électriciens qualifiés réalisent des installations aux normes, durables et adaptées à vos besoins."
      iconName="zap"
      prestations={prestations}
      faqs={faqs}
    />
  );
}




