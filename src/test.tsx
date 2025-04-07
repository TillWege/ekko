import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { emit, listen } from "@tauri-apps/api/event";

import '@mantine/core/styles.css';

import { Box, Button, MantineProvider, Text, Title } from '@mantine/core';


function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const unlisten = listen("inc", (event) => {
            console.log("Received event:", event);
            setCount((c) => c + 1);
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, []);

    const send = () => {
        console.log("Sending event...");
        emit("inc");
    };

    return (
        <Box className="bg-secondary">
            <Title className="text-primary-foreground shadow-xs">React Counter</Title>
            <Text className="text-primary-foreground shadow-xs">
                Current count: {count}
            </Text>
            <Button onClick={send}>Increment</Button>
        </Box>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <MantineProvider forceColorScheme="dark">
        <App />
      </MantineProvider>
    </React.StrictMode>,
);
