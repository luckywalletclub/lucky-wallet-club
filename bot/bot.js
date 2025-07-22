const TelegramBot = require('node-telegram-bot-api');

// Paste your BotFather token here
require('dotenv').config();
   const token = process.env.TELEGRAM_BOT_TOKEN;

// Start the bot (polling)
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello! Type /game to start the game.');
});

bot.onText(/\/game/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Game started! (Game link will be here soon)');
});