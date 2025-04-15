import React, { useState } from "react"; // Import React
import { Title, Button, Text } from "@mantine/core";
import { BaseWidget, BaseWidgetProps } from "./BaseWidget";

type CounterWidgetProps = Omit<BaseWidgetProps, "children">;

export const CounterWidget = React.forwardRef<
    HTMLDivElement,
    CounterWidgetProps
>((props, ref) => {
    const [count, setCount] = useState(0);

    return (
        <BaseWidget {...props} ref={ref}>
            <Title>React Counter</Title>
            <Text>Current count: {count}</Text>
            <Button onClick={() => setCount((n) => n + 1)}>Increment</Button>
        </BaseWidget>
    );
});
