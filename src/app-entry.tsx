import { createApp } from "./common-entry";
import { Center, Tabs, Title } from "@mantine/core";
import { useState } from "react";

createApp({
    rootElementId: "root",
    MainLayout: App,
});

function App() {
    const [activeTab, setActiveTab] = useState<string | null>("first");

    return (
        <>
            <Center>
                {/* Add Logo or change font */}
                <Title>Ekko</Title>
            </Center>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="first">Dashboard</Tabs.Tab>
                    <Tabs.Tab value="second">Options</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="first">First panel</Tabs.Panel>
                <Tabs.Panel value="second">Second panel</Tabs.Panel>
            </Tabs>
        </>
    );
}
