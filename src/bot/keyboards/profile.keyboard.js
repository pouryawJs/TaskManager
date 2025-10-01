const { Markup } = require("telegraf");

exports.profile = () =>
	Markup.inlineKeyboard([
		[Markup.button.callback("📝 تغییر اطلاعات", "GET_INFORMATION")],
		[Markup.button.callback("⬅️ برگشت", "MAIN_MENU")],
	]);
