const userService = require("../../services/user.service");

module.exports = (bot) => {
	bot.command("admin1386", async (ctx) => {
		if (ctx.from.id.toString() === process.env.ADMIN_ID) {
			const users = await userService.getAllActivatedUsers();

			return ctx.reply(
				`activated users: ${users.length} \n List: \n ${users
					.map(
						(u) =>
							`- @${u.username === "None" ? "" : u.username} (${
								u.id
							})`
					)
					.join("\n")}`
			);
		}
	});
};
