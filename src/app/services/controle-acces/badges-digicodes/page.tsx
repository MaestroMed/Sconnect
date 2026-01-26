import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Badges & Digicodes | Contrôle d'Accès RFID | S'Connect",
  description: "Installation de systèmes de contrôle d'accès par badges RFID et digicodes en Île-de-France. Solutions professionnelles pour entreprises, copropriétés, bureaux. Devis gratuit.",
  keywords: ["badge RFID", "digicode", "contrôle accès badge", "lecteur badge", "système accès", "badge proximité", "gestion accès"],
  openGraph: {
    title: "Badges & Digicodes | Contrôle d'Accès | S'Connect",
    description: "Installation de systèmes d'accès par badges et digicodes. Solutions professionnelles en Île-de-France.",
    images: ["/og-image.jpg"],
  },
};

const prestations = [
  { title: "Systèmes à badges", items: ["Lecteurs de badges RFID", "Badges de proximité", "Gestion multi-sites", "Historique des passages", "Programmation horaires"] },
  { title: "Digicodes", items: ["Claviers à code rétroéclairés", "Codes temporaires visiteurs", "Changement de code facile", "Antivandale extérieur", "Intégration interphone"] },
  { title: "Solutions avancées", items: ["Lecteurs biométriques", "Reconnaissance faciale", "Contrôle d'accès connecté", "Application smartphone", "Intégration alarme"] },
];

const faqs = [
  { question: "Quelle est la différence entre badge et digicode ?", answer: "Le badge est personnel et permet de tracer les accès individuels. Le digicode est un code partagé, plus simple mais moins sécurisé." },
  { question: "Peut-on gérer les accès à distance ?", answer: "Oui, nos systèmes connectés permettent de gérer les accès depuis votre smartphone : attribution de badges, codes temporaires, historique." },
];

export default function BadgesDigicodesPage() {
  return (
    <ServicePageTemplate
      title="Badges & Digicodes"
      subtitle="Contrôle d'accès"
      description="Contrôlez et tracez les accès à vos locaux avec nos solutions de badges et digicodes. Idéal pour les entreprises, copropriétés et résidences sécurisées."
      iconName="zap"
      prestations={prestations}
      faqs={faqs}
    />
  );
}




