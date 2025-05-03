import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    age: integer("age"),
    created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
