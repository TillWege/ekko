import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "../assets/Atkinson.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";
import "../assets/test.css";

import { ScrollArea } from "@mantine/core";
import { CounterWidget } from "@/common/widgets/CounterWidget";
import { useState } from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

export function ScrollLayout() {
    const [layouts, setLayouts] = useState<Layouts>({
        lg: [{ i: "counter", x: 6, y: 1, w: 3, h: 3 }],
    });

    return (
        <ScrollArea
            style={{
                flex: 1,
            }}
        >
            <ResponsiveGridLayout
                onLayoutChange={() => setLayouts(layouts)}
                layouts={layouts}
                compactType={null}
                breakpoints={{ lg: 1200 }}
                cols={{ lg: 12 }}
                rowHeight={80}
                draggableHandle=".drag-handle"
                autoSize={false}
                style={{ minHeight: "100%" }}
            >
                <CounterWidget key="counter" />
            </ResponsiveGridLayout>
        </ScrollArea>
    );
}
