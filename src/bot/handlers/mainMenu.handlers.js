const safeAction = require("../../utils/safeAction");
const mainMenuUI = require("../../services/ui/mainMenu.ui.service");

module.exports = (bot) => {
	bot.command("menu", async (ctx) => {
		if (ctx.scene && ctx.scene.current) {
			try {
				await ctx.scene.leave();
			} catch (e) {
				console.error("leave scene error:", e);
			}
		}
		mainMenuUI.showMainMenu(ctx, true);
	});

	safeAction(bot, "MAIN_MENU", (ctx) => mainMenuUI.showMainMenu(ctx));

	safeAction(bot, "GUIDE", (ctx) => mainMenuUI.showGuide(ctx));
};
