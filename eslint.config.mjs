import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Les pages chargent leurs données avec fetch() dans un useEffect, qui passe
      // loading à true avant le premier await : signalé, mais sans bug réel.
      // À repasser en erreur après migration vers SWR ou les Server Components.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    // Scripts Node (CommonJS) lancés à la main via npm run
    files: ["scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
