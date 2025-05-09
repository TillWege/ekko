import { createApp } from "./common-entry";
import {
    Flex,
    Tabs,
    ActionIcon,
    Group,
    Box,
    Text,
    MantineStyleProp,
} from "@mantine/core";
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
import { Dashboard } from "./app/dashboard";

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

import { keyframes } from "@mantine/emotion";
import { DbTest } from "./app/dbtest";
import { Chat } from "./app/chat";

const fadeIn = keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
});

const panelStyle: MantineStyleProp = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    animation: `${fadeIn} 5000ms ease-out`,
};

function App() {
    console.log(window.location.pathname);
    const [activeTab, setActiveTab] = useState<string | null>("dashboard");

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
                onChange={(val) => {
                    console.log(val);
                    setActiveTab(val);
                }}
                inverted
                keepMounted={false}
            >
                <Tabs.Panel style={panelStyle} value="dashboard">
                    <Dashboard />
                </Tabs.Panel>
                <Tabs.Panel style={panelStyle} value="debug">
                    <DbTest />
                </Tabs.Panel>
                <Tabs.Panel style={panelStyle} value="chat">
                    <Chat />
                </Tabs.Panel>

                <Tabs.List>
                    <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
                    <Tabs.Tab value="chat">Chat</Tabs.Tab>
                    <Tabs.Tab value="debug">Debug</Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </Flex>
    );
}
