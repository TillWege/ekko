import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/db/schema.ts",
    driver: "durable-sqlite",
    verbose: false,
    strict: true,
    out: "./src-tauri/migrations",
});
