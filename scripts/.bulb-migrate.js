// Temporary migration script — replaces gradient-text-living spans/paragraphs
// in hero contexts with <BulbText> wrapper, and adds the import.

const fs = require("fs");

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const files = [
  ["src/app/contact/page.tsx", "span", "Contactez-nous"],
  ["src/app/avis/page.tsx", "span", "nos clients"],
  ["src/app/demande-devis/page.tsx", "span", "devis gratuit"],
  ["src/app/marques/page.tsx", "span", "référence"],
  ["src/app/services/page.tsx", "span", "votre habitat"],
  ["src/app/realisations/page.tsx", "span", "derniers chantiers"],
  ["src/app/presentation/page.tsx", "span-suffix", "multi-services"],
  ["src/app/services/metallerie/structure-metallique/page.tsx", "p-block", "Artisanat, Île-de-France"],
  ["src/app/services/metallerie/fabrication-portail/page.tsx", "p-block", "Sur mesure, Île-de-France"],
  ["src/app/services/metallerie/fabrication-porte/page.tsx", "p-block", "Sur mesure, Île-de-France"],
  ["src/app/services/electricite/relamping/bureau-tertiaire/page.tsx", "p-block", "Conformité NF EN 12464-1 · Gestion DALI · Décret tertiaire"],
  ["src/app/services/electricite/relamping/commerce-restaurant/page.tsx", "p-block", "IRC &gt; 90 · Scénographie modulable · Chantier de nuit"],
  ["src/app/services/electricite/relamping/copropriete-parking/page.tsx", "p-block", "Charges ÷ 5 · Détection présence · Dossier AG géré"],
  ["src/app/services/electricite/relamping/industriel-entrepot/page.tsx", "p-block", "High-bay 150 lm/W · IP65 · ATEX disponible"],
];

let totalImports = 0, totalReplaces = 0, skipped = [];

for (const [file, kind, text] of files) {
  let src = fs.readFileSync(file, "utf-8");
  const before = src;

  // 1) Add BulbText import if not present
  if (!src.includes("import BulbText")) {
    const m = src.match(/(import .*? from "lucide-react";\n)/);
    if (m) {
      src = src.replace(m[1], m[1] + 'import BulbText from "@/components/ui/BulbText";\n');
      totalImports++;
    }
  }

  // 2) Replace the gradient-text-living span / p with BulbText
  if (kind === "span") {
    const re = new RegExp('<span className="gradient-text-living">' + escapeRegex(text) + "</span>", "g");
    src = src.replace(re, "<BulbText>" + text + "</BulbText>");
  } else if (kind === "span-suffix") {
    const re = new RegExp('<span className="gradient-text-living">' + escapeRegex(text) + "</span> de confiance", "g");
    src = src.replace(re, "<BulbText>" + text + "</BulbText> de confiance");
  } else if (kind === "p-block") {
    const escaped = escapeRegex(text);
    const re = new RegExp('<p className="text-xl md:text-2xl font-medium mb-6 gradient-text-living">\\s+' + escaped + "\\s+</p>", "g");
    const replacement = '<p className="text-xl md:text-2xl font-medium mb-6">\n              <BulbText>' + text + "</BulbText>\n            </p>";
    src = src.replace(re, replacement);
  }

  if (src !== before) {
    fs.writeFileSync(file, src);
    totalReplaces++;
    console.log("  ok " + file);
  } else {
    skipped.push(file);
  }
}
console.log("Imports added: " + totalImports + " | Files modified: " + totalReplaces);
if (skipped.length) console.log("SKIPPED (no match):", skipped);
