import 'dotenv/config'
// import TelegramBot
import TelegramBot from 'node-telegram-bot-api';

const serverStartUpTime = Date.now();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

export default bot;