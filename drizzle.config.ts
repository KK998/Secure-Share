import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'sqlite',
    dbCredentials: {
        url: String(process.env.DATABASE_URL)
    },
    schema: './server/database/schema.ts',
    out: './server/database/migrations'
})
