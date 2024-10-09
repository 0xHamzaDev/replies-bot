import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const serversTable = sqliteTable('servers', {
	id: integer('id').primaryKey(),
	name: text('name'),
});

export const repliesTable = sqliteTable('replies', {
	id: integer('id').primaryKey(),
	command: text('command'),
	reply: text('reply'),
	serverId: integer('server_id').references(() => serversTable.id),
});

export const serversRelations = relations(serversTable, ({ many }) => ({
	replies: many(repliesTable),
}));

export const repliesRelations = relations(repliesTable, ({ one }) => ({
	server: one(serversTable, {
		fields: [repliesTable.serverId],
		references: [serversTable.id],
	}),
}));