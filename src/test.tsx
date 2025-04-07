import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { emit, listen } from "@tauri-apps/api/event";

import '@mantine/core/styles.css';
import "./assets/Atkinson.css";

import { Box, Button, createTheme, MantineProvider, Text, Title } from '@mantine/core';


const theme = createTheme({
    fontFamily: 'Atkinson Hyperlegible',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
  });

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
        <Box h={"100%"} w={"100%"}>
            <Title>React Counter</Title>
            <Text>
                Current count: {count}
            </Text>
            <Button onClick={send}>Increment</Button>
        </Box>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <MantineProvider theme={theme} forceColorScheme="dark">
        <App />
      </MantineProvider>
    </React.StrictMode>,
);
