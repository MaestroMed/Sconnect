import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat permet de réutiliser la config eslintrc historique de Next
// (`next/core-web-vitals`) depuis le nouveau format flat config d'ESLint 9.
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Config ESLint flat (ESLint 9 + Next 15.5).
 * Remplace l'ancien .eslintrc.json — `next lint` est déprécié (supprimé dans Next 16).
 * Lancé via `npm run lint` => `eslint .`.
 */
const eslintConfig = [
  // Ignores globaux : un objet ne contenant QUE `ignores` s'applique globalement.
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      ".claude/**", // worktrees + config internes Claude Code (build output, copies src)
      "public/**",
      "scripts/**",
      "content/**",
    ],
  },
  // Règles Next core-web-vitals (wrappées depuis l'ancien format eslintrc).
  ...compat.extends("next/core-web-vitals"),
  // Overrides — conservés à l'identique de l'ancien .eslintrc.json.
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
