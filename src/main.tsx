import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TrayIcon } from "@tauri-apps/api/tray";
import { isRegistered, register } from "@tauri-apps/plugin-global-shortcut";
import { Menu } from "@tauri-apps/api/menu";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { LogicalPosition } from "@tauri-apps/api/dpi";
import { platform } from "@tauri-apps/plugin-os";

let vis = true;

async function toggleVisibility() {
  const currWindow = getCurrentWebviewWindow();

  if (!vis) {
    await currWindow.setPosition(new LogicalPosition(0, 0));
  } else {
    await currWindow.setPosition(new LogicalPosition(1e6, 1e6));
  }
  vis = !vis;
}

async function init() {
  const currWindow = getCurrentWindow();
  await currWindow.setSkipTaskbar(true);
  await currWindow.setAlwaysOnTop(true);

  const tray = await TrayIcon.new({
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
        id: "close",
        text: "Close App",
        action: () => {
          console.log("close pressed");
        },
      },
    ],
  });

  tray.setMenu(menu);

  const p = await platform();

  if (p == "macos") {
  } else {
    const isReg = await isRegistered("F22");
    if (!isReg) {
      await register("F22", async (event) => {
        if (event.state == "Pressed") await toggleVisibility();
      });
    }
  }
}

await init();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
