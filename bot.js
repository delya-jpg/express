const TelegramBot = require('node-telegram-bot-api');
const token = '8113565640:AAFuUDu8lY3Cwjjp_nzLSnndZtYASAU9pCc';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет, октагон!');
});

bot.onText(/\/help/, (msg) => {
  const helpText = `
Доступные команды:
/site - ссылка на сайт октагона
/creator - ФИО разработчика
  `;
  bot.sendMessage(msg.chat.id, helpText);
});

bot.onText(/\/site/, (msg) => {
  bot.sendMessage(msg.chat.id, 'https://octagon.ru');
});

bot.onText(/\/creator/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Протопопова Аделина Александровна');
});

