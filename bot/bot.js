const TelegramBot = require('node-telegram-bot-api');

// Paste your BotFather token here
require('dotenv').config();
   const token = process.env.TELEGRAM_BOT_TOKEN;

// Start the bot (polling)
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to the Winners Club!\nJoin the Club and be lucky one!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Play !",
            web_app: { url: "https://lucky-wallet-club.vercel.app" }
          }
        ]
      ]
    }
  });
});