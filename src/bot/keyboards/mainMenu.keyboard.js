const { Markup } = require("telegraf");

exports.mainMenu = () =>
	Markup.inlineKeyboard([
		[
			Markup.button.callback(
				"👨‍💻 مدیریت برنامه های روزانه",
				"PROGRAM_MANAGEMENT"
			),
		],
		[
			Markup.button.callback("🚥 راهنما", "GUIDE"),
			Markup.button.callback("👤 پروفایل", "PROFILE"),
		],
	]);

exports.guide = () =>
	Markup.inlineKeyboard([[Markup.button.callback("⬅️ برگشت", "MAIN_MENU")]]);
