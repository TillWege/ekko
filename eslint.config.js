import react              from "eslint-plugin-react";
import typescriptParser   from "@typescript-eslint/parser";
import tsPlugin           from "@typescript-eslint/eslint-plugin";
import js                  from "@eslint/js";
import globals            from "globals";

export default [
  // React/JSX files
  {
    plugins: {
      react,
      "@typescript-eslint": tsPlugin,
    },
    files: ["src/**/*.{jsx,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
      },
    },
    settings: {
      react: { version: "18.3" },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,

      // disable core rule, enable TS rule as a warning:
      "no-unused-vars":            "off",
      "@typescript-eslint/no-unused-vars": "warn",

      "react/react-in-jsx-scope":  "off",
      "react/jsx-uses-react":      "off",
    },
  },

  // plain .js/.ts files
  {
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    files: ["src/**/*.{js,ts}"],
    languageOptions: {
      parser: typescriptParser,
      globals: { ...globals.browser },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
      },
    },
    rules: {
      ...js.configs.recommended.rules,

      // again disable core rule so TS version is the only one
      "no-unused-vars":            "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
