import React, { useState } from "react"; // Import React
import { Button, Text } from "@mantine/core";
import { BaseWidget, BaseWidgetProps } from "./BaseWidget";
import { AnimatePresence, motion } from "motion/react";

type CounterWidgetProps = Omit<Omit<BaseWidgetProps, "children">, "title">;

export const CounterWidget = React.forwardRef<
    HTMLDivElement,
    CounterWidgetProps
>((props, ref) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const toggle = () => setIsVisible((v) => !v);

    return (
        <BaseWidget title="React Counter" {...props} ref={ref}>
            <Text>Current count: {count}</Text>
            <Button onClick={toggle}>Increment</Button>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        I fade in & out
                    </motion.div>
                )}
            </AnimatePresence>
        </BaseWidget>
    );
});

CounterWidget.displayName = "CounterWidget";
