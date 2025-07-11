import { defineConfig } from "eslint/config";
import globals from "globals";
// import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  { files: ["**/*.{mjs,cjs,ts}"] },
  { files: ["**/*.{mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
  // { files: ["**/*.{mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  {
    ignores: ["**/dist/**", "libs/base-wrapper"],
  },
  tseslint.configs.recommended,
  {
    rules: {
      // "no-duplicate-variable": "error",
      // "no-unused-variable": "warn",
      // "trailing-comma": "off",
      // "max-len": ["warn", 180],
      // "align": "off",
      // "strict-boolean-expressions": "off",
      // "object-shorthand-properties-first": "off",
      // "no-else-after-return": "off",
      semi: ["warn", "always"],
      quotes: "off",
      "@typescript-eslint/variable-name": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-magic-numbers": "off",
      "@/indent": ["warn", 2, { SwitchCase: 1 }],
      "@/no-duplicate-imports": "error",
    },
  },
]);
