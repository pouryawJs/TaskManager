const safeAction = require("../../utils/safeAction");
const mainMenuKeyboard = require("./../keyboards/mainMenu.keyboard");
const mainMenuMessage = require("./../messages/mainMenu.message");

module.exports = (bot) => {
	safeAction(bot, "MAIN_MENU", (ctx) => {
		ctx.editMessageText(mainMenuMessage.mainMenu(), {
			parse_mode: "HTML",
			...mainMenuKeyboard.mainMenu(),
		});
	});

	safeAction(bot, "GUIDE", (ctx) => {
		ctx.editMessageText(mainMenuMessage.guide(), {
			parse_mode: "HTML",
			...mainMenuKeyboard.guide(),
		});
	});
};
