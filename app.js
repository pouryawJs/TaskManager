require("dotenv").config();
const configs = require("./configs");
require("./src/configs/db")();
const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(configs.bot.token);

bot.start((ctx) =>
	ctx.reply(
		"Welcome",
		Markup.inlineKeyboard([[Markup.button.callback("پروفایل", "profile")]])
	)
);

bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch(() => {
	console.log("Bot Launch successfully!😊");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
