import { Message } from 'node-telegram-bot-api';
import { db } from '@db/db.js';
import { repliesTable } from '@db/schema.js';
import { eq } from 'drizzle-orm';
import bot from '@/server.js';

export const listRepliesCommand = async (msg: Message) => {
	if (msg.chat.type === 'private') return;
	const chatId = msg.chat.id;

	try {
		const replies = await db.query.repliesTable.findMany({
			where: (reply) => eq(reply.serverId, chatId),
		})
		const formattedReplies = replies.map(r => `${r.command}: ${r.reply}`).join('\n');
		bot.sendMessage(chatId, `Replies for this server:\n${formattedReplies}`);
	} catch {
		bot.sendMessage(chatId, 'Failed to retrieve replies.');
	}
};
