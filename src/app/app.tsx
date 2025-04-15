import { useEffect, useState } from "react";
import { emit, listen, UnlistenFn } from "@tauri-apps/api/event";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "../assets/Atkinson.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../assets/test.css";

import {
    Box,
    Button,
    Card,
    Paper,
    ScrollArea,
    SimpleGrid,
    Text,
    Title,
} from "@mantine/core";
import { BaseWidget } from "@/common/widgets/BaseWidget";
import { CounterWidget } from "@/common/widgets/CounterWidget";

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

const ResponsiveGridLayout = WidthProvider(Responsive);

export function ScrollLayout() {
    const layouts = {
        lg: [
            { i: "a", x: 0, y: 0, w: 3, h: 2 },
            { i: "b", x: 3, y: 0, w: 3, h: 2 },
            { i: "c", x: 6, y: 0, w: 3, h: 2 },
        ],
    };

    return (
        <ScrollArea scrollbars="y" h={"100vh"} scrollbarSize={14}>
            <ResponsiveGridLayout
                layouts={layouts}
                compactType={null}
                breakpoints={{ lg: 1200 }}
                cols={{ lg: 12 }}
                rowHeight={80}
                draggableHandle=".drag-handle"
            >
                <Box
                    style={{
                        border: "1px solid red",
                    }}
                    key="a"
                >
                    Item A
                </Box>
                <Box
                    style={{
                        border: "1px solid red",
                        borderRadius: 20,
                        padding: 20,
                    }}
                    key="b"
                >
                    Item B
                </Box>

                <CounterWidget key="c" />
            </ResponsiveGridLayout>
        </ScrollArea>
    );
}
