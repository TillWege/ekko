import { createApp } from "./common-entry";
import { Flex, Tabs, Title, ActionIcon, Group, Box, Text } from "@mantine/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

createApp({
    rootElementId: "root",
    MainLayout: App,
});

import {
    IconMaximize,
    IconMinimize,
    IconPin,
    IconPinFilled,
    IconX,
} from "@tabler/icons-react";
import { ScrollLayout } from "./app/app";

const currentWindow = getCurrentWindow();

function TitleBar() {
    const [pinned, setPinned] = useState(false);

    const togglePin = () => {
        setPinned(!pinned);
        currentWindow.setAlwaysOnTop(!pinned);
    };

    useEffect(() => {
        currentWindow.setAlwaysOnTop(pinned);
    }, []);

    return (
        <Flex align="center" data-tauri-drag-region>
            <Box
                data-tauri-drag-region
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <ActionIcon mt="sm" ml="sm" onClick={togglePin}>
                    {pinned ? (
                        <IconPinFilled
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    ) : (
                        <IconPin
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    )}
                </ActionIcon>
            </Box>

            <Group data-tauri-drag-region>
                <Text
                    data-tauri-drag-region
                    style={{
                        userSelect: "none",
                    }}
                    fw={700}
                    size="xl"
                    variant="gradient"
                    gradient={{ from: "indigo", to: "blue", deg: 90 }}
                >
                    Ekko v0.1.0
                </Text>
            </Group>

            <Box
                data-tauri-drag-region
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <ActionIcon
                    mt="sm"
                    mr="sm"
                    onClick={() => currentWindow.minimize()}
                >
                    <IconMinimize
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
                <ActionIcon
                    mt="sm"
                    mr="sm"
                    onClick={async () => {
                        const max = await currentWindow.isMaximized();
                        console.log(max);
                        max
                            ? currentWindow.unmaximize()
                            : currentWindow.maximize();
                    }}
                >
                    <IconMaximize
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
                <ActionIcon
                    mt="sm"
                    mr="sm"
                    onClick={() => currentWindow.close()}
                >
                    <IconX
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Box>
        </Flex>
    );
}

function App() {
    const [activeTab, setActiveTab] = useState<string | null>("first");

    return (
        <Flex h={"100vh"} mah={"100vh"} direction={"column"}>
            <TitleBar />
            <Tabs
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
                value={activeTab}
                onChange={setActiveTab}
                inverted
            >
                <Tabs.Panel
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        flexGrow: 1,
                    }}
                    value="first"
                >
                    <ScrollLayout />
                </Tabs.Panel>
                <Tabs.Panel
                    style={{
                        flex: 1,
                        flexGrow: 1,
                    }}
                    value="second"
                >
                    <p>Options</p>
                </Tabs.Panel>

                <Tabs.List>
                    <Tabs.Tab value="first">Dashboard</Tabs.Tab>
                    <Tabs.Tab value="second">Options</Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </Flex>
    );
}
