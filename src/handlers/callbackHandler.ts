import bot from '@/server.js';
import { CallbackQuery } from 'node-telegram-bot-api';

export const callbackHandler = (callbackQuery: CallbackQuery) => {
	const message = callbackQuery.message;
	const chatId = message?.chat.id;

	if (callbackQuery.data === '/add_reply') {
		bot.sendMessage(chatId, 'Please use the /add_reply command followed by the command and the reply.');
	} else if (callbackQuery.data === '/remove_reply') {
		bot.sendMessage(chatId, 'Please use the /remove_reply command followed by the command.');
	} else if (callbackQuery.data === '/replies') {
		bot.sendMessage(chatId, 'Please use the /replies command to list all replies.');
	} else if (callbackQuery.data === '/invite') {
		bot.sendMessage(chatId, 'Please use the /invite command to generate an invite link.');
	}
};