import { buildMetadata } from "@/lib/metadata";

// page.tsx est "use client" et ne peut pas exporter de metadata — sans ce
// layout, la page héritait du title/description/OG de la home (doublon).
export const metadata = buildMetadata({
  title: "Présentation — S Connect, artisan multi-métiers à Clichy",
  description:
    "Découvrez S Connect France : entreprise artisanale fondée en 2021 à Clichy par Mehdi Belkacem. Électricité, serrurerie, métallerie et contrôle d'accès en Île-de-France.",
  path: "/presentation",
});

export default function PresentationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
