import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "../assets/Atkinson.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../assets/test.css";

import { Box, ScrollArea } from "@mantine/core";
import { CounterWidget } from "@/common/widgets/CounterWidget";

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
