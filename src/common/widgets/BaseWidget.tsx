import React from "react";
import { Box, Paper } from "@mantine/core";

export type BaseWidgetProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onTouchEnd?: React.TouchEventHandler;
};

export const BaseWidget = React.forwardRef<HTMLDivElement, BaseWidgetProps>(
    (
        { children, style, className, onMouseDown, onMouseUp, onTouchEnd },
        ref,
    ) => (
        <Box
            ref={ref}
            style={{
                border: "1px solid",
                borderRadius: 20,
                height: "100%",
                width: "100%",
                ...style,
            }}
            className={className}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
        >
            <Paper
                bg="red"
                style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 30,
                }}
                className="drag-handle"
            />
            <Box m={20}>{children}</Box>
        </Box>
    ),
);
