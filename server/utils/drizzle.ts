import { drizzle } from 'drizzle-orm/libsql/node';
import * as schema from '../database/schema'

export const tables = schema

export function useDrizzle() {
    if (!process.env.DATABASE_URL) throw Error('Specify database url!')
    if (!process.env.DATABASE_AUTH_TOKEN) throw Error('Specify database auth token!')

    return drizzle({
        connection: {
            url: process.env.DATABASE_URL,
            authToken: process.env.DATABASE_AUTH_TOKEN,
        },
        schema
    })
}

export type Share = typeof schema.shares.$inferSelect;