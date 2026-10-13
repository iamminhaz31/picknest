import "dotenv/config";
import { Pool } from "pg";

const globalForDatabase = globalThis as unknown as {
  picknestPool?: Pool;
};

export const db =
  globalForDatabase.picknestPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.picknestPool = db;
}