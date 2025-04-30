import React, { useState } from "react"; // Import React
import { Button, Text } from "@mantine/core";
import { BaseWidget, BaseWidgetProps } from "./BaseWidget";

type CounterWidgetProps = Omit<Omit<BaseWidgetProps, "children">, "title">;

export const CounterWidget = React.forwardRef<
    HTMLDivElement,
    CounterWidgetProps
>((props, ref) => {
    const [count, setCount] = useState(0);

    return (
        <BaseWidget title="React Counter" {...props} ref={ref}>
            <Text>Current count: {count}</Text>
            <Button onClick={() => setCount((n) => n + 1)}>Increment</Button>
        </BaseWidget>
    );
});

CounterWidget.displayName = "CounterWidget";
