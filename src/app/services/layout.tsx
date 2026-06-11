import { buildMetadata } from "@/lib/metadata";

// page.tsx est "use client" et ne peut pas exporter de metadata — sans ce
// layout, la page héritait du title/description/OG de la home (doublon).
export const metadata = buildMetadata({
  title: "Nos Services — Électricité, Serrurerie, Métallerie & Contrôle d'accès",
  description:
    "Tous les services S Connect en Île-de-France : électricité générale et relamping LED, serrurerie et blindage, métallerie sur mesure, contrôle d'accès et interphonie. Devis gratuit, urgences 24h/24.",
  path: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
