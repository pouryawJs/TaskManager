require("dotenv").config();
const configs = require("./configs");
const { Telegraf, Markup, Telegram } = require("telegraf");
const setupHandlers = require("./src/bot/index");
const setupCrons = require("./src/cron");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const telegram = new Telegram(configs.bot.token);

const bot = new Telegraf(configs.bot.token);
bot.telegram = telegram;

//* Handler
setupHandlers(bot);

//* Cron
setupCrons(bot);

//* Launch
bot.launch((ctx) => {
	console.log("Bot Launch successfully!😊");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
