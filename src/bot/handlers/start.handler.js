const startKeyboard = require("./../keyboards/start.keyboard");
const startMessage = require("./../messages/start.message");
const userService = require("./../../services/user.service");

module.exports = (bot) => {
	bot.start(async (ctx) => {
		if (ctx.scene && ctx.scene.current) {
			try {
				await ctx.scene.leave();
			} catch (e) {
				console.error("leave scene error:", e);
			}
		}
		//* check user
		const userTgID = ctx.from.id;
		const username = ctx.from.username;

		let user = await userService.findUser(userTgID);
		if (!user) {
			user = await userService.createUser(userTgID, username);
		}

		ctx.reply(startMessage(), { parse_mode: "HTML", ...startKeyboard });
	});
};
