require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));

bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.launch(() => {
	console.log("Bot Launch successfully!😊");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
