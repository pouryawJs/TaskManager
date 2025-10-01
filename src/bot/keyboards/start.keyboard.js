const { Markup } = require("telegraf");

module.exports = Markup.inlineKeyboard([
	Markup.button.callback("🔥 شروع", "GET_INFORMATION"),
]);
