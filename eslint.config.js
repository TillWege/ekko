import react from "eslint-plugin-react";
import typescriptParser from "@typescript-eslint/parser";
import js from "@eslint/js";

export default [
    {
        plugins: {
            react,
        },
        files: ["src/**/*.{jsx,tsx}"], // Only apply React/JSX rules to .jsx and .tsx files
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: "latest",
                sourceType: "module",
                project: ["./tsconfig.json"], // Adjust this path to your tsconfig.json
            },
        },
        settings: {
            react: {
                version: "18.3",
            },
        },
        rules: {
            ...js.configs.recommended.rules, // Include basic rules
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
        },
    },
    {
        files: ["src/**/*.{js,ts}"], // Apply standard JS/TS rules to .js and .ts files
        languageOptions: {
            parser: typescriptParser, // Still use TS parser for TS files
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: ["./tsconfig.json"], // Adjust this path to your tsconfig.json
            },
        },
        rules: {
            ...js.configs.recommended.rules,
        },
    },
];
