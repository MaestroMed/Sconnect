import { Wrench, Phone } from "lucide-react";
import { getSiteConfig } from "@/lib/data-service";

export const metadata = {
  title: "Maintenance · S Connect France",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  const config = getSiteConfig();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-700 via-primary-600 to-electric-600 text-white px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur">
          <Wrench className="w-10 h-10 animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
          Site en maintenance
        </h1>
        <p className="text-lg text-white/85 mb-8 leading-relaxed">
          Nous améliorons votre expérience. Le site sera de nouveau disponible très bientôt.
          <br />
          Pour toute urgence, contactez-nous directement.
        </p>
        <a
          href={`tel:${config.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-2 rounded-xl bg-white text-primary-700 px-6 py-3 font-semibold shadow-lg hover:bg-white/90 transition-colors"
        >
          <Phone className="w-5 h-5" />
          {config.phone}
        </a>
      </div>
    </div>
  );
}
