const safeAction = require("../../utils/safeAction");
const mainMenuUI = require("../../services/ui/mainMenu.ui.service");

module.exports = (bot) => {
	safeAction(bot, "MAIN_MENU", (ctx) => mainMenuUI.showMainMenu(ctx));

	safeAction(bot, "GUIDE", (ctx) => mainMenuUI.showGuide(ctx));
};
