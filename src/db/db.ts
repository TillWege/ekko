import { drizzle } from "drizzle-orm/sqlite-proxy";
import Database from "@tauri-apps/plugin-sql";
import * as schema from "./schema";
import { readDir, readTextFile } from "@tauri-apps/plugin-fs";
import { resourceDir } from "@tauri-apps/api/path";

/** Lazily load or reuse the Tauri SQLite connection */
async function getSqliteDb() {
    return await Database.load("sqlite:app.db");
}

let migrationsDone = false;

export async function migrate(sqlite: Database) {
    if (migrationsDone) return;
    migrationsDone = true;

    const resourcePath = await resourceDir();
    const files = await readDir(`${resourcePath}/migrations`);
    let migrations = files.filter((file) => file.name?.endsWith(".sql"));

    // sort migrations by the first 4 characters of the file name
    migrations = migrations.sort((a, b) => {
        const aHash = a.name?.replace(".sql", "").slice(0, 4);
        const bHash = b.name?.replace(".sql", "").slice(0, 4);

        if (aHash && bHash) {
            return aHash.localeCompare(bHash);
        }

        return 0;
    });

    const migrationTableCreate = /*sql*/ `
          CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              hash text NOT NULL UNIQUE,
              created_at numeric
          )
      `;

    await sqlite.execute(migrationTableCreate, []);

    console.log(migrations);
    for (const migration of migrations) {
        const hash = migration.name?.replace(".sql", "");

        const dbMigrations = (await sqlite.select(
            /*sql*/ `SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC`,
        )) as unknown as { id: number; hash: string; created_at: number }[];

        const hasBeenRun = (hash: string) =>
            dbMigrations.find((dbMigration) => {
                return dbMigration?.hash === hash;
            });

        if (hash && hasBeenRun(hash) === undefined) {
            //debugger;
            const sql = await readTextFile(
                `${resourcePath}/migrations/${migration.name}`,
            );

            const r2 = await sqlite.execute(
                /*sql*/ `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
                [hash, Date.now()],
            );
            const r1 = await sqlite.execute(sql, []);
            console.log(r1, r2);
        }
    }

    console.info("Migrations complete");

    return Promise.resolve();
}

export async function prepareDb() {
    console.log("prepareDb");
    const sqlite = await getSqliteDb();
    await migrate(sqlite);
}

/** Drizzle database instance */
export const db = drizzle<typeof schema>(async (sql, params, method) => {
    const sqlite = await getSqliteDb();

    // SELECT queries
    if (method === "all" || method === "get") {
        const resultObjects = await sqlite.select(sql, params);
        const rows = (resultObjects as object[]).map((obj) =>
            Object.values(obj).map((val) => String(val)),
        );
        return method === "get" ? { rows: rows[0] || [] } : { rows };
    }

    // INSERT/UPDATE/DELETE
    await sqlite.execute(sql, params);
    return { rows: [] };
});
