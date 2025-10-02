const safeAction = require("../../utils/safeAction");
const profileUI = require("./../../services/ui/profile.ui.service");

module.exports = (bot) => {
	safeAction(bot, "PROFILE", async (ctx) => await profileUI.showProfile(ctx));
};
