const TelegramBot = require('node-telegram-bot-api');

// Paste your BotFather token here
const token = '7919655118:AAFiv9c_YDiCZXmRNcRoBlH0ueSxBumOL-w';

// Start the bot (polling)
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello! Type /game to start the game.');
});

bot.onText(/\/game/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Game started! (Game link will be here soon)');
});