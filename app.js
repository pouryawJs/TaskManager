require("dotenv").config();
const configs = require("./configs");
require("./src/configs/db")();
const { Telegraf, Markup } = require("telegraf");
const setupHandlers = require("./src/bot/index");

const bot = new Telegraf(configs.bot.token);

//* Handler
setupHandlers(bot);

//* Launch
bot.launch(() => {
	console.log("Bot Launch successfully!😊");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
