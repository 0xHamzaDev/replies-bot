import { Message } from 'node-telegram-bot-api';
import bot from '@/server.js';

const commandKeyboard = {
	reply_markup: {
		keyboard: [
			[
				{ 
					text: '/invite',
					description: 'Invite the bot to your server',
				}
			],
		],
		resize_keyboard: true,
		one_time_keyboard: false,
	},
};

export const startCommand = (msg: Message) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Welcome! Use the button below to invite me to your server:', commandKeyboard);
};
