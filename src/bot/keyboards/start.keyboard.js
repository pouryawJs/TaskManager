const { Markup } = require("telegraf");

module.exports = Markup.inlineKeyboard([
	Markup.button.callback("🔥 شروع", "MAIN_MENU"),
]);
