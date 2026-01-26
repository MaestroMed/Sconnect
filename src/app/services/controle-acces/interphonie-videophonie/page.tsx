import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Interphonie & Vidéophonie | Installation & Dépannage | S'Connect",
  description: "Installation et dépannage d'interphones et vidéophones en Île-de-France. Systèmes audio et vidéo pour copropriétés, particuliers, entreprises. Devis gratuit, intervention rapide.",
  keywords: ["interphone", "vidéophone", "interphonie", "vidéophonie", "installation interphone", "dépannage interphone", "interphone copropriété", "visiophone"],
  openGraph: {
    title: "Interphonie & Vidéophonie | S'Connect",
    description: "Installation et dépannage d'interphones et vidéophones. Intervention en Île-de-France.",
    images: ["/og-image.jpg"],
  },
};

const prestations = [
  { title: "Interphonie", items: ["Interphone audio individuel", "Interphone collectif copropriété", "Platine de rue antivandale", "Combinés intérieurs", "Remplacement système existant"] },
  { title: "Vidéophonie", items: ["Visiophone couleur HD", "Écran tactile", "Mémoire d'images", "Vision nocturne infrarouge", "Connexion smartphone"] },
  { title: "Accessoires", items: ["Gâches électriques", "Ventouses électromagnétiques", "Boutons poussoirs", "Badges et télécommandes", "Claviers à code"] },
];

const faqs = [
  { question: "Peut-on installer un visiophone dans une copropriété ?", answer: "Oui, nous installons des systèmes vidéo pour copropriétés avec platine de rue commune et moniteurs individuels dans chaque appartement." },
  { question: "Mon interphone ne fonctionne plus, que faire ?", answer: "Nous intervenons rapidement pour diagnostiquer et réparer. Souvent, il s'agit d'un problème de combiné ou de câblage facilement réparable." },
];

export default function InterphoneVideophoniePage() {
  return (
    <ServicePageTemplate
      title="Interphonie & Vidéophonie"
      subtitle="Contrôle d'accès"
      description="Sécurisez l'entrée de votre bâtiment avec nos solutions d'interphonie et vidéophonie. Du simple interphone audio au système vidéo connecté avec ouverture à distance."
      iconName="zap"
      prestations={prestations}
      faqs={faqs}
    />
  );
}




