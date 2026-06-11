import { buildMetadata } from "@/lib/metadata";

// page.tsx est "use client" et ne peut pas exporter de metadata — sans ce
// layout, la page héritait du title/description/OG de la home (doublon).
export const metadata = buildMetadata({
  title: "Nos marques partenaires — Matériel pro certifié",
  description:
    "Les marques installées par S Connect : Legrand, Schneider, Hager, Trilux, Sylvania, FAAC, Came, Fichet, Picard, Vachette… Du matériel professionnel certifié, garanti et durable.",
  path: "/marques",
});

export default function MarquesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
