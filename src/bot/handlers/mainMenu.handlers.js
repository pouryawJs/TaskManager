const mainMenuKeyboard = require("./../keyboards/mainMenu.keyboard");
const mainMenuMessage = require("./../messages/mainMenu.message");

module.exports = (bot) => {
	bot.action("MAIN_MENU", (ctx) => {
		ctx.editMessageText(mainMenuMessage.mainMenu(), {
			parse_mode: "HTML",
			...mainMenuKeyboard.mainMenu(),
		});
	});

	bot.action("GUIDE", (ctx) => {
		ctx.editMessageText(mainMenuMessage.guide(), {
			parse_mode: "HTML",
			...mainMenuKeyboard.guide(),
		});
	});
};
