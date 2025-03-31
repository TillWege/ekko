import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TrayIcon } from "@tauri-apps/api/tray";
import { register } from "@tauri-apps/plugin-global-shortcut";
import { Menu } from "@tauri-apps/api/menu";

async function init() {
  const tray = await TrayIcon.new({ tooltip: "awesome tray tooltip" });
  tray.setTooltip("new tooltip");
  tray.setIcon("icons/icon.ico");
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
    ],
  });

  tray.setMenu(menu);

  await register("F22", () => {
    console.log("Shortcut triggered");
  });
}

await init();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
