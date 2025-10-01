const { Markup } = require("telegraf");

exports.nextStep = Markup.inlineKeyboard([
	Markup.button.callback("اتمام ✅", "MAIN_MENU"),
]);
