import { createApp } from "./common-entry";
import { Flex, Box, Text, Group, ActionIcon, Tabs } from "@mantine/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import {
    HashRouter,
    Routes,
    Route,
    useNavigate,
    useLocation,
} from "react-router-dom";

createApp({
    rootElementId: "root",
    MainLayout: AppContent,
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

import { DbTest } from "./app/debugIndex";
import { Chat } from "./app/chatIndex";
import { Notes } from "./app/notesIndex";

function AppContent() {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath =
        location.pathname === "/"
            ? "dashboard"
            : location.pathname.substring(1);

    return (
        <HashRouter>
            <Flex h={"100vh"} mah={"100vh"} direction={"column"}>
                <TitleBar />
                <Tabs
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                    value={currentPath}
                    onChange={(value) => navigate(`/${value}`)}
                    inverted
                >
                    <Box
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/debug" element={<DbTest />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/notes" element={<Notes />} />
                        </Routes>
                    </Box>
                    <Tabs.List>
                        <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
                        <Tabs.Tab value="chat">Chat</Tabs.Tab>
                        <Tabs.Tab value="debug">Debug</Tabs.Tab>
                        <Tabs.Tab value="notes">Notes</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </Flex>
        </HashRouter>
    );
}
