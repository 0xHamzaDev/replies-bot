import { Message } from 'node-telegram-bot-api';
import { db } from '@db/db.js';
import { and, eq } from 'drizzle-orm';
import { repliesTable } from '@db/schema.js';
import bot from '@/server.js';

export const messageHandler = async (msg: Message) => {
	const chatId = msg.chat.id;
	const text = msg.text?.trim() || '';

	if (!text) return;

	try {
		const replyEntries = await db.query.repliesTable.findMany({
			where: (reply) => and(eq(reply.serverId, chatId), eq(reply.command, text)),
		});

		if (replyEntries.length > 0) {
			for (const entry of replyEntries) {
				await bot.sendMessage(chatId, entry.reply);
			}
		}
	} catch (error) {
		console.error('Error handling message:', error);
	}
}