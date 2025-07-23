const TelegramBot = require('node-telegram-bot-api');

// Paste your BotFather token here
require('dotenv').config();
   const token = process.env.TELEGRAM_BOT_TOKEN;

// Backend API URL
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

// Start the bot (polling)
const bot = new TelegramBot(token, { polling: true });

// Node.js fetch (v18+ native, eski sürümde node-fetch gerekir)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

bot.onText(/\/start/, async (msg) => {
  // Kullanıcıyı backend'e kaydet
  const user = msg.from;
  try {
    await fetch(`${BACKEND_URL}/api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegram_id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      })
    });
  } catch (err) {
    console.error('Backend user save error:', err);
  }

  bot.sendMessage(msg.chat.id, "Welcome to the Winners Club!\nJoin the Club and be lucky one!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Play !",
            web_app: { url: "https://lucky-wallet-club.vercel.app?tid=" + user.id }
          }
        ]
      ]
    }
  });
});