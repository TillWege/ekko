import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "./assets/Atkinson.css";
import { prepareDb } from "./db/db";

type AppConfig = {
    rootElementId: string;
    MainLayout: React.FC;
    theme?: MantineThemeOverride;
    forceColorScheme?: "light" | "dark";
};

export async function createApp({
    rootElementId = "root",
    MainLayout,
    theme = {
        colors: {
            dark: [
                "#C1C2C5",
                "#A6A7AB",
                "#909296",
                "#5c5f66",
                "#373A40",
                "#2C2E33",
                "#25262b",
                "#1A1B1E",
                "#141517",
                "#101113",
            ],
        },
        fontFamily: "Atkinson Hyperlegible",
        fontFamilyMonospace: "Monaco, Courier, monospace",
        primaryColor: "indigo",
    },
    forceColorScheme = "dark",
}: AppConfig) {
    const rootElement = document.getElementById(rootElementId);

    if (!rootElement) {
        throw new Error(`Root element with id "${rootElementId}" not found.`);
    }

    {
        await prepareDb();
    }

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <MantineProvider
                theme={theme}
                forceColorScheme={forceColorScheme}
                stylesTransform={emotionTransform}
            >
                <MantineEmotionProvider>
                    <MainLayout />
                </MantineEmotionProvider>
            </MantineProvider>
        </React.StrictMode>,
    );
}
