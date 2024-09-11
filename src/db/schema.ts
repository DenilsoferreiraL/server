import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2'

export const goals = pgTable('goals', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    title: text('text').notNull(),
    desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow()
})

export const goalCompletions = pgTable('goal-completions', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    goalId: text('goal_id')
        .references(() => goals.id)
        .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow()
})