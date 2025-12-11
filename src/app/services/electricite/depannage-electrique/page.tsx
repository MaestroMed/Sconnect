import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Dépannage Électrique Urgent 24h/24 | S Connect France",
  description: "Dépannage électrique urgent 24h/24, 7j/7 à Clichy et Île-de-France. Intervention sous 2h. Panne, court-circuit, disjoncteur.",
};

const prestations = [
  { title: "Pannes courantes", items: ["Disjoncteur qui saute", "Panne générale de courant", "Coupure partielle de l'installation", "Problème de tableau électrique", "Fusibles qui sautent"] },
  { title: "Urgences électriques", items: ["Court-circuit", "Odeur de brûlé", "Étincelles aux prises", "Fils dénudés ou endommagés", "Mise en sécurité"] },
  { title: "Recherche de panne", items: ["Diagnostic complet de l'installation", "Localisation des défauts", "Identification des causes", "Mesures et tests électriques", "Rapport d'intervention"] },
];

const faqs = [
  { question: "En combien de temps intervenez-vous ?", answer: "Pour les urgences, nous nous engageons sur une intervention sous 2 heures maximum. Nous sommes disponibles 24h/24, 7j/7." },
  { question: "Mon disjoncteur saute sans arrêt, que faire ?", answer: "C'est généralement le signe d'une surcharge ou d'un défaut d'isolement. En attendant notre intervention, essayez de débrancher les appareils récemment connectés." },
  { question: "Quel est le coût d'un dépannage en urgence ?", answer: "Le déplacement en urgence est facturé entre 80€ et 150€ selon l'heure. Nous établissons toujours un devis avant intervention." },
];

export default function DepannageElectriquePage() {
  return (
    <ServicePageTemplate
      title="Dépannage Électrique"
      subtitle="Intervention 24h/24"
      description="Panne de courant, court-circuit, disjoncteur qui saute ? Nos électriciens interviennent en urgence 24h/24, 7j/7 pour rétablir votre confort électrique."
      iconName="alertTriangle"
      prestations={prestations}
      faqs={faqs}
    />
  );
}




