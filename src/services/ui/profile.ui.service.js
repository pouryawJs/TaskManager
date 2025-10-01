const profileKeyboard = require("./../../bot/keyboards/profile.keyboard");
const profileMessages = require("./../../bot/messages/profile.message");

exports.showProfile = (ctx) => {
	ctx.editMessageText(profileMessages.pofile(), {
		parse_mode: "HTML",
		...profileKeyboard.profile(),
	});
};
