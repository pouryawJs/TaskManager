const mainMenuKeyboard = require("../../bot/keyboards/mainMenu.keyboard");
const mainMenuMessage = require("../../bot/messages/mainMenu.message");

exports.showMainMenu = (ctx, isCommand = false) => {
	if (!isCommand) {
		ctx.editMessageText(mainMenuMessage.mainMenu(), {
			parse_mode: "HTML",
			...mainMenuKeyboard.mainMenu(),
		});
	} else {
		ctx.reply(mainMenuMessage.mainMenu(), {
			parse_mode: "HTML",
			...mainMenuKeyboard.mainMenu(),
		});
	}
};

exports.showGuide = (ctx) => {
	ctx.editMessageText(mainMenuMessage.guide(), {
		parse_mode: "HTML",
		...mainMenuKeyboard.guide(),
	});
};
