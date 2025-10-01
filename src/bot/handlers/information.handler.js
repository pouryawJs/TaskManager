const safeAction = require("../../utils/safeAction");

module.exports = (bot) => {
	safeAction(bot, "GET_INFORMATION", (ctx) =>
		ctx.scene.enter("GET_INFORMATION_SCENE")
	);
};
