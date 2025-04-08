import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { emit, listen } from "@tauri-apps/api/event";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "./assets/Atkinson.css";

import {
    Box,
    Button,
    Card,
    createTheme,
    Grid,
    MantineProvider,
    ScrollArea,
    SimpleGrid,
    Text,
    Title,
} from "@mantine/core";

const theme = createTheme({
    fontFamily: "Atkinson Hyperlegible",
    fontFamilyMonospace: "Monaco, Courier, monospace",
});

function Counter() {
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
        <Box>
            <Title>React Counter</Title>
            <Text>Current count: {count}</Text>
            <Button onClick={send}>Increment</Button>
        </Box>
    );
}

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SimpleGrid
            m={"md"}
            cols={{ base: 1, sm: 2, lg: 5 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
        >
            {[1, 2, 3, 4, 5].map((n) => {
                return (
                    <Card
                        bg={"dark.7"}
                        withBorder
                        style={{
                            borderRadius: 20,
                            padding: 40,
                        }}
                        key={n}
                        h={400}
                    >
                        <Card.Section>
                            <Counter key={n}></Counter>
                        </Card.Section>
                    </Card>
                );
            })}
        </SimpleGrid>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider theme={theme} forceColorScheme="dark">
            <ScrollArea h={"100vh"} scrollbarSize={14}>
                <p>
                    Charizard (Pokémon) Charizard description from Bulbapedia
                    Charizard is a draconic, bipedal Pokémon. It is primarily
                    orange with a cream underside from the chest to the tip of
                    its tail. It has a long neck, small blue eyes, slightly
                    raised nostrils, and two horn-like structures protruding
                    from the back of its rectangular head. There are two fangs
                    visible in the upper jaw when its mouth is closed. Two large
                    wings with blue-green undersides sprout from its back, and a
                    horn-like appendage juts out from the top of the third joint
                    of each wing. A single wing-finger is visible through the
                    center of each wing membrane. Charizard's arms are short and
                    skinny compared to its robust belly, and each limb has three
                    white claws. It has stocky legs with cream-colored soles on
                    each of its plantigrade feet. The tip of its long, tapering
                    tail burns with a sizable flame. As Mega Charizard X, its
                    body and legs are more physically fit, though its arms
                    remain thin. Its skin turns black with a sky-blue underside
                    and soles. Two spikes with blue tips curve upward from the
                    front and back of each shoulder, while the tips of its horns
                    sharpen, turn blue, and curve slightly upward. Its brow and
                    claws are larger, and its eyes are now red. It has two
                    small, fin-like spikes under each horn and two more down its
                    lower neck. The finger disappears from the wing membrane,
                    and the lower edges are divided into large, rounded points.
                    The third joint of each wing-arm is adorned with a claw-like
                    spike. Mega Charizard X breathes blue flames out the sides
                    of its mouth, and the flame on its tail now burns blue. It
                    is said that its new power turns it black and creates more
                    intense flames.
                </p>
            </ScrollArea>
            {/* <Layout>
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
                <Counter />
            </Layout> */}
        </MantineProvider>
    </React.StrictMode>,
);
