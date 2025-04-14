import { useEffect, useState } from "react";
import { emit, listen } from "@tauri-apps/api/event";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "../assets/Atkinson.css";

import {
    Box,
    Button,
    Card,
    ScrollArea,
    SimpleGrid,
    Text,
    Title,
} from "@mantine/core";

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

export function ScrollLayout() {
    return (
        <ScrollArea h={"100vh"} scrollbarSize={14}>
            <Layout>
                <></>
            </Layout>
        </ScrollArea>
    );
}
