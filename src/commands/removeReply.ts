import { Message } from 'node-telegram-bot-api';
import { db } from '@db/db.js';
import { repliesTable } from '@db/schema.js';
import { and, eq } from 'drizzle-orm';
import bot from '@/server.js';

export const removeReplyCommand = async (msg: Message, match: RegExpMatchArray) => {
	if (msg.chat.type === 'private') return;
	const chatId = msg.chat.id;
	const command = match[1];

	try {
		const replies = await db.query.repliesTable.findMany({
			where: and(eq(repliesTable.command, command), eq(repliesTable.serverId, chatId)),
		})
		if (replies.length === 0) {
			return bot.sendMessage(chatId, `No reply found for command: ${command} in this server.`); 
		} else {
			await db.delete(repliesTable).where(and(eq(repliesTable.command, command), eq(repliesTable.serverId, chatId)));
			bot.sendMessage(chatId, `Reply removed for command: ${command} in this server.`);
		}
	} catch {
		bot.sendMessage(chatId, 'Failed to remove reply.');
	}
};
