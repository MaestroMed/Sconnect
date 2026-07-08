import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import PricingTable from "@/components/marketing/PricingTable";
import { getPricing } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "Dépannage Électrique Urgent 24h/24 | S Connect France",
  description: "Dépannage électrique urgent 24h/24, 7j/7 en Île-de-France. Intervention rapide sous 2h : panne de courant, court-circuit, disjoncteur qui saute. Électricien disponible jour et nuit.",
  keywords: ["dépannage électrique", "électricien urgence", "panne électrique", "court-circuit", "disjoncteur qui saute", "dépannage 24h", "urgence électrique"],
  openGraph: {
    title: "Dépannage Électrique Urgent 24h/24 | S Connect France",
    description: "Dépannage électrique d'urgence en Île-de-France. Intervention rapide 24h/24, 7j/7.",
    images: ["/og-image.jpg"],
  },
};

const prestations = [
  { title: "Pannes courantes", items: ["Disjoncteur qui saute", "Panne générale de courant", "Coupure partielle de l'installation", "Problème de tableau électrique", "Fusibles qui sautent"] },
  { title: "Urgences électriques", items: ["Court-circuit", "Odeur de brûlé", "Étincelles aux prises", "Fils dénudés ou endommagés", "Mise en sécurité"] },
  { title: "Recherche de panne", items: ["Diagnostic complet de l'installation", "Localisation des défauts", "Identification des causes", "Mesures et tests électriques", "Rapport d'intervention"] },
];

const faqs = [
  { question: "En combien de temps intervenez-vous ?", answer: "Pour les urgences, nous nous engageons sur une intervention sous 2 heures maximum. Nous sommes disponibles 24h/24, 7j/7." },
  { question: "Mon disjoncteur saute sans arrêt, que faire ?", answer: "C'est généralement le signe d'une surcharge ou d'un défaut d'isolement. En attendant notre intervention, essayez de débrancher les appareils récemment connectés." },
  { question: "Quel est le coût d'un dépannage en urgence ?", answer: "Le déplacement en horaires ouvrés est facturé à partir de 90€ TTC (déplacement + diagnostic). En urgence nuit ou week-end, comptez 130-180€. Nous établissons toujours un devis avant intervention, sans surprise." },
];

const pricingSection = (
  <PricingTable variant="muted" {...getPricing("electricite/depannage-electrique")} />
);

export default function DepannageElectriquePage() {
  return (
    <ServicePageTemplate
      title="Dépannage Électrique"
      subtitle="Intervention 24h/24"
      description="Panne de courant, court-circuit, disjoncteur qui saute ? Nos électriciens interviennent en urgence 24h/24, 7j/7 pour rétablir votre confort électrique."
      iconName="alertTriangle"
      category="electricite"
      imageSlug="electricite-depannage"
      parentCategory={{ label: "Électricité", href: "/services/electricite" }}
      prestations={prestations}
      faqs={faqs}
      extraContent={pricingSection}
    />
  );
}




