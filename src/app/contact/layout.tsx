import { buildMetadata } from "@/lib/metadata";

// page.tsx est "use client" et ne peut pas exporter de metadata — sans ce
// layout, la page héritait du title/description/OG de la home (doublon).
export const metadata = buildMetadata({
  title: "Contact — Devis gratuit & urgences 24h/24",
  description:
    "Contactez S Connect : devis gratuit sous 24h, urgences électricité et serrurerie 24h/24 à Clichy et en Île-de-France. Téléphone, email ou formulaire.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
