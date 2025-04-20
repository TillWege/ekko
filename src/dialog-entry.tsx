import React from "react";
import ReactDOM from "react-dom/client";
import App from "./dialog/dialog";
import { TrayIcon } from "@tauri-apps/api/tray";
import {
    isRegistered,
    register,
    unregister,
} from "@tauri-apps/plugin-global-shortcut";
import { Menu } from "@tauri-apps/api/menu";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { LogicalPosition } from "@tauri-apps/api/dpi";
import { platform } from "@tauri-apps/plugin-os";

let vis = true;

async function toggleVisibility() {
    const currWindow = getCurrentWebviewWindow();

    if (!vis) {
        await currWindow.center();
        await currWindow.requestUserAttention(null);
    } else {
        await currWindow.setPosition(new LogicalPosition(1e6, 1e6));
    }
    vis = !vis;
}

function setupWindow() {
    const currWindow = getCurrentWebviewWindow();
    currWindow.setAlwaysOnTop(true);
    currWindow.setDecorations(false);
    currWindow.setSkipTaskbar(true);
}

async function setupTray() {
    const tray = await TrayIcon.new({
        id: "ekko",
        icon: "icons/logo-small.png",
        tooltip: "Ekko",
    });

    tray.setShowMenuOnLeftClick(true);

    const menu = await Menu.new({
        items: [
            {
                id: "open",
                text: "Open App",
                action: () => {
                    console.log("open pressed");
                },
            },
            {
                id: "dlg",
                text: "Open Dialog",
                action: () => {
                    console.log("open dialog pressed");
                    toggleVisibility();
                },
            },
            {
                id: "close",
                text: "Close App",
                action: () => {
                    console.log("close pressed");
                },
            },
        ],
    });

    tray.setMenu(menu);

    const currWindow = getCurrentWebviewWindow();
    currWindow.onCloseRequested(async () => {
        await tray.close();
    });
}

async function registerShortcut() {
    const currWindow = getCurrentWebviewWindow();
    const p = await platform();

    if (p == "macos") {
        //
    } else {
        const isReg = await isRegistered("F22");
        if (!isReg) {
            await register("F22", async (event) => {
                if (event.state == "Pressed") await toggleVisibility();
            });
        }

        currWindow.onCloseRequested(async () => {
            unregister("F22").then(() => {
                console.log("unregistered F22");
            });
        });
    }
}

async function init() {
    setupWindow();
    await setupTray();
    await registerShortcut();
}

await init();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
