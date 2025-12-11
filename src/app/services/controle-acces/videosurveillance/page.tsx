import { Metadata } from "next";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Vidéosurveillance | Caméras IP | S Connect France",
  description: "Installation de vidéosurveillance à Clichy et Île-de-France. Caméras HD, enregistreurs, accès smartphone. Particuliers et professionnels. Devis gratuit.",
};

const prestations = [
  { title: "Caméras", items: ["Caméras dôme intérieures", "Caméras bullet extérieures", "Caméras PTZ motorisées", "Vision nocturne infrarouge", "Résolution 4K/HD"] },
  { title: "Enregistrement", items: ["Enregistreurs NVR/DVR", "Stockage cloud sécurisé", "Détection de mouvement", "Alertes smartphone", "Relecture facile"] },
  { title: "Installation", items: ["Étude personnalisée", "Câblage propre et discret", "Paramétrage complet", "Formation utilisateur", "Maintenance préventive"] },
];

const faqs = [
  { question: "Ai-je le droit d'installer des caméras chez moi ?", answer: "Oui, vous pouvez filmer votre propriété privée. Les caméras ne doivent pas filmer la voie publique ni les propriétés voisines." },
  { question: "Puis-je voir mes caméras sur mon téléphone ?", answer: "Oui, toutes nos installations permettent un accès à distance via application smartphone. Vous pouvez voir en direct et recevoir des alertes." },
];

export default function VideosurveillancePage() {
  return (
    <ServicePageTemplate
      title="Vidéosurveillance"
      subtitle="Sécurité connectée"
      description="Protégez vos biens et vos proches avec nos solutions de vidéosurveillance. Caméras HD, vision nocturne, accès à distance sur smartphone."
      iconName="zap"
      prestations={prestations}
      faqs={faqs}
    />
  );
}




