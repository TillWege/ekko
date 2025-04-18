import { useEffect, useState } from "react";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";

function App() {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const currWindow = getCurrentWindow();

        const unlisten = currWindow.onFocusChanged(({ payload: focused }) => {
            console.log("Focus changed, window is focused? " + focused);
            if (!focused) {
                console.log("Window is not focused, closing");
            }
        });

        unlisten.then((unlisten) => {
            return () => {
                unlisten();
            };
        });
    }, []);

    return (
        <main className="container">
            <form
                className="row"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const currWindow = getCurrentWebviewWindow();
                    const baseSize = await currWindow.size();

                    setExpanded(!expanded);
                    for (let i = 0; i < 10; i++) {
                        await currWindow.setSize(
                            new LogicalSize(
                                baseSize.width,
                                baseSize.height + 50 * i * (expanded ? -1 : 1),
                            ),
                        );
                    }
                }}
            >
                <input placeholder="Enter message" />
                <button type="submit">Run</button>
            </form>
            {expanded && <hr></hr>}
        </main>
    );
}

export default App;
