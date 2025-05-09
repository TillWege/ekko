import {
    Box,
    Button,
    Flex,
    Group,
    Textarea,
    TextInput,
    Text,
    Center,
    ActionIcon,
} from "@mantine/core";
import {
    IconArrowBack,
    IconArrowLeft,
    IconDotsVertical,
} from "@tabler/icons-react";
import { useState } from "react";

enum Author {
    User,
    Ai,
    System,
}

interface Message {
    id: number;
    text: string;
    author: Author;
}

type Messages = Message[];

function ChatHeader() {
    return (
        <Flex justify="space-between" align="center" w={"100%"} mt="sm">
            <ActionIcon ml="sm">
                <IconArrowBack />
            </ActionIcon>
            <Text>Conversation about mocking things</Text>
            <ActionIcon mr="sm">
                <IconDotsVertical />
            </ActionIcon>
        </Flex>
    );
}

export function Chat() {
    const [chat, setChat] = useState<Messages>([]);
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendMessage = () => {
        setChat([
            ...chat,
            { id: chat.length, text: message, author: Author.User },
        ]);
        setMessage("");
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            addMockResponse();
        }, 3000);
    };

    const addMockResponse = () => {
        setChat((prev) => [
            ...prev,
            { id: prev.length, text: "Mock response", author: Author.Ai },
        ]);
    };

    return (
        <Flex
            direction="column"
            style={{
                flexGrow: 1,
            }}
        >
            <ChatHeader />
            <Box
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "30px",
                    gap: "10px",
                }}
            >
                {chat.map((message) => (
                    <Text
                        style={{
                            width: "100%",
                            textAlign:
                                message.author === Author.User
                                    ? "left"
                                    : "right",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "10px",
                        }}
                        key={message.id}
                    >
                        {message.text}
                    </Text>
                ))}
                {isLoading && <Text>Loading...</Text>}
            </Box>
            <Group p={"md"}>
                <Textarea
                    style={{ flexGrow: 1 }}
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={sendMessage}>Send</Button>
            </Group>
        </Flex>
    );
}
