import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const shares = sqliteTable('shares', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    content: text('content'),
    destructable: integer('destructable').default(0),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
