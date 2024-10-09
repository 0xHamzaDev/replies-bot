import TelegramBot, { Message, CallbackQuery } from 'node-telegram-bot-api';
import { config } from 'dotenv';
import { startCommand } from '@/commands/start.js';
import { addReplyCommand } from '@/commands/addReply.js';
import { removeReplyCommand } from '@/commands/removeReply.js';
import { listRepliesCommand } from '@/commands/listReplies.js';
import { inviteCommand } from '@/commands/invite.js';
import { db } from '@db/db.js';
import { serversTable } from '@db/schema.js';
import { messageHandler } from './handlers/messageHandler.js';
import { callbackHandler } from './handlers/callbackHandler.js';

config();

const token: string = process.env.TOKEN!;
if (!token) {
    console.error('Bot token not found. Please set the TOKEN environment variable.');
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

const handleCommand = (command: string, msg: Message, match: RegExpExecArray | null, callback: Function) => {
    if (match) {
        callback(msg, match as RegExpMatchArray);
    } else {
        bot.sendMessage(msg.chat.id, `Invalid command syntax for ${command}`);
    }
};

bot.onText(/\/start/, startCommand);
bot.onText(/\/add_reply (.+) (.+)/, (msg: Message, match: RegExpExecArray | null) => handleCommand('/add_reply', msg, match, addReplyCommand));
bot.onText(/\/remove_reply (.+)/, (msg: Message, match: RegExpExecArray | null) => handleCommand('/remove_reply', msg, match, removeReplyCommand));
bot.onText(/\/replies/, listRepliesCommand);
bot.onText(/\/invite/, inviteCommand);

bot.on('message', messageHandler);
bot.on('callback_query', callbackHandler);

export default bot;