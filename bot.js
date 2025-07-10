const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql2');
const token = '8113565640:AAFuUDu8lY3Cwjjp_nzLSnndZtYASAU9pCc';

const bot = new TelegramBot(token, { polling: true });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'ChatBotTests',
  password: '',
  connectionLimit: 4
}).promise();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет, октагон!');
});

bot.onText(/\/help/, (msg) => {
  const helpText = `
Доступные команды:
/site - ссылка на сайт октагона
/creator - ФИО разработчика
/randomItem - случайный предмет
/deleteItem ID - удалить предмет по ID
/getItemByID ID - получить предмет по ID
  `;
  bot.sendMessage(msg.chat.id, helpText);
});

bot.onText(/\/site/, (msg) => {
  bot.sendMessage(msg.chat.id, 'https://octagon.ru');
});

bot.onText(/\/creator/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Протопопова Аделина Александровна');
});

bot.onText(/\/randomItem/, (msg) => {
  pool.query('SELECT * FROM Items ORDER BY RAND() LIMIT 1', (err, results) => {
    if (err || results.length === 0) {
      bot.sendMessage(msg.chat.id, 'Ошибка');
      return;
    }

    const item = results[0];
    bot.sendMessage(msg.chat.id, `(${item.id}) - ${item.name}: ${item.desc}`);
  });
});


bot.onText(/\/deleteItem (\d+)/, (msg, match) => {
  const id = match[1];

  pool.query('DELETE FROM Items WHERE id = ?', [id], (err, result) => {
    if (err) {
      bot.sendMessage(msg.chat.id, 'Ошибка при удалении.');
      return;
    }

    if (result.affectedRows > 0) {
      bot.sendMessage(msg.chat.id, 'Удачно удалено!');
    } else {
      bot.sendMessage(msg.chat.id, 'Ошибка: предмет с таким ID не найден.');
    }
  });
});

bot.onText(/\/getItemByID (\d+)/, (msg, match) => {
  const id = match[1];

  pool.query('SELECT * FROM Items WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) {
      bot.sendMessage(msg.chat.id, 'Ошибка или предмет не найден.');
      return;
    }

    const item = results[0];
    bot.sendMessage(msg.chat.id, `(${item.id}) - ${item.name}: ${item.desc}`);
  });
});


