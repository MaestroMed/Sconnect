import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Ouverture de Porte 24h/24 | Serrurier Urgent | S'Connect",
  description: "Ouverture de porte claquée, bloquée ou fermée à clé en Île-de-France. Intervention rapide 24h/24, 7j/7. Sans casse dans 95% des cas. Serrurier professionnel.",
  keywords: ["ouverture porte", "porte claquée", "serrurier urgence", "porte bloquée", "clé cassée", "ouverture sans casse", "serrurier 24h"],
  openGraph: {
    title: "Ouverture de Porte 24h/24 | S'Connect",
    description: "Ouverture de porte d'urgence 24h/24. Intervention rapide, sans casse dans 95% des cas.",
    images: ["/og-image.jpg"],
  },
};

const prestations = [
  { title: "Ouvertures d'urgence", items: ["Porte claquée (clés à l'intérieur)", "Porte fermée à clé (perte/vol)", "Serrure bloquée ou cassée", "Clé cassée dans la serrure", "Porte blindée"] },
  { title: "Techniques utilisées", items: ["Ouverture fine sans dégât", "Crochetage professionnel", "By-pass et techniques douces", "Perçage en dernier recours", "Remplacement serrure si nécessaire"] },
  { title: "Tous types de portes", items: ["Portes d'appartement", "Portes de maison", "Portes de cave/garage", "Portes de bureau", "Coffres-forts"] },
];

const faqs = [
  { question: "Combien coûte une ouverture de porte ?", answer: "Le tarif dépend du type de serrure et de l'heure. Comptez entre 80€ et 150€ en journée. Nous donnons le prix exact avant intervention." },
  { question: "Allez-vous abîmer ma porte ?", answer: "Dans 95% des cas, nous ouvrons sans aucun dégât grâce à nos techniques professionnelles." },
  { question: "Intervenez-vous la nuit et le week-end ?", answer: "Oui, notre service d'urgence fonctionne 24h/24, 7j/7, y compris les jours fériés." },
];

export default function OuverturePortePage() {
  return (
    <ServicePageTemplate
      title="Ouverture de Porte"
      subtitle="Urgence 24h/24"
      description="Porte claquée, clés perdues ou volées, serrure bloquée ? Nos serruriers interviennent en urgence 24h/24 pour vous permettre de rentrer chez vous."
      iconName="zap"
      prestations={prestations}
      faqs={faqs}
    />
  );
}




