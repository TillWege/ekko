import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "./assets/Atkinson.css";

type AppConfig = {
    rootElementId: string;
    MainLayout: React.FC;
    theme?: MantineThemeOverride;
    forceColorScheme?: "light" | "dark";
};

export function createApp({
    rootElementId = "root",
    MainLayout,
    theme = {
        fontFamily: "Atkinson Hyperlegible",
        fontFamilyMonospace: "Monaco, Courier, monospace",
    },
    forceColorScheme = "dark",
}: AppConfig) {
    const rootElement = document.getElementById(rootElementId);

    if (!rootElement) {
        throw new Error(`Root element with id "${rootElementId}" not found.`);
    }

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <MantineProvider theme={theme} forceColorScheme={forceColorScheme}>
                <MainLayout />
            </MantineProvider>
        </React.StrictMode>,
    );
}
