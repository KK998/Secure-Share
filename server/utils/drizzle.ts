import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../database/schema'
import Database from 'better-sqlite3';

export const tables = schema

if (!process.env.DATABASE_URL) throw Error('Specify database url!')

const sqlite = new Database(process.env.DATABASE_URL)

export function useDrizzle() {

    return drizzle({
        client: sqlite,
        schema
    })
}

export type Share = typeof schema.shares.$inferSelect;