import { Message } from 'node-telegram-bot-api';
import { db } from '@db/db.js';
import { repliesTable, serversTable } from '@db/schema.js';
import { eq } from 'drizzle-orm';
import bot from '@/server.js';

const ensureServer = async (chatId: number, chatTitle: string) => {
	const server = await db.query.serversTable.findMany({ 
		where: (server) => eq(server.id, chatId),
	});
	if (!server) {
		await db.insert(serversTable).values({ id: chatId, name: chatTitle });
	}
};

export const addReplyCommand = async (msg: Message, match: RegExpMatchArray) => {
	if (msg.chat.type === 'private') return;
	const chatId = msg.chat.id;
	const chatTitle = msg?.chat?.title || 'Server';
	const command = match[1];
	const reply = match[2];

	await ensureServer(chatId, chatTitle);
	
	try {
		await db.insert(repliesTable).values({ 
			command: command, 
			reply: reply, 
			serverId: chatId 
		});
		bot.sendMessage(chatId, `Reply added for command: ${command} in this server.`);
	} catch {
		bot.sendMessage(chatId, 'Failed to add reply.');
	}
};
