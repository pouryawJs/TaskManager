const startKeyboard = require("./../keyboards/start.keyboard");
const startMessage = require("./../messages/start.message");

module.exports = (bot) => {
	bot.start((ctx) => {
		ctx.reply(startMessage(), { parse_mode: "HTML", ...startKeyboard });
	});
};
