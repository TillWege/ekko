import { db } from "@/db/db";
import { Box, Button, Divider, Title } from "@mantine/core";
import { useState } from "react";
import { users } from "@/db/schema";

async function getUsers() {
    const data = await db.select().from(users);
    console.log(data);
    return data;
}

async function addUser() {
    const randInt = Math.floor(Math.random() * 1000);
    await db.insert(users).values({ name: "John Doe", age: randInt });
}

export function DbTest() {
    const [users, setUsers] = useState<any[]>([]);

    return (
        <Box>
            <Title>Users</Title>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.age}
                    </li>
                ))}
            </ul>
            <Button onClick={async () => setUsers(await getUsers())}>
                Get Users
            </Button>

            <Divider />
            <Button onClick={async () => addUser()}>Create User</Button>
        </Box>
    );
}
