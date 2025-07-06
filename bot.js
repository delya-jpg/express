const TelegramBot = require('node-telegram-bot-api');
const token = '8113565640:AAFuUDu8lY3Cwjjp_nzLSnndZtYASAU9pCc';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет, октагон!');
});
