import React from "react";
import { Box, Paper, Text } from "@mantine/core";

export type BaseWidgetProps = {
    title: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onTouchEnd?: React.TouchEventHandler;
};

export const BaseWidget = React.forwardRef<HTMLDivElement, BaseWidgetProps>(
    (
        {
            children,
            style,
            className,
            onMouseDown,
            onMouseUp,
            onTouchEnd,
            title,
        },
        ref,
    ) => (
        <Box
            ref={ref}
            sx={(theme) => {
                return {
                    border: `1px solid ${theme.colors.dark[4]}`,
                    borderRadius: 10,
                    height: "100%",
                    width: "100%",
                    ...style,
                };
            }}
            className={className}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
        >
            <Paper
                bg="dark.6"
                style={{
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: 30,
                }}
                className="drag-handle"
            >
                <Text
                    ml={"md"}
                    fw={700}
                    style={{
                        userSelect: "none",
                    }}
                    pt={2}
                >
                    {title}
                </Text>
            </Paper>
            <Box m={20}>{children}</Box>
        </Box>
    ),
);

BaseWidget.displayName = "BaseWidget";
