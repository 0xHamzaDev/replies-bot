import { Message } from 'node-telegram-bot-api';
import bot from '@/server.js';

export const inviteCommand = async (msg: Message) => {
	const chatId = msg.chat.id;
 
	if (msg.chat.type === 'private') {
		try {
			const botInfo = await bot.getMe();
			const inviteLink = `https://t.me/${botInfo.username}?startgroup=true`;
			bot.sendMessage(chatId, `Click this link to invite me to your server: ${inviteLink}`);
		} catch {
			bot.sendMessage(chatId, 'Failed to generate invite link.');
		}
	} else {
		bot.sendMessage(chatId, 'This command only works in private chat.');
	}
};
