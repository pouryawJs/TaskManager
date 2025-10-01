const sendReplyAndDelete = require("./sendReplyAndDelete");

function safeAction(bot, pattern, handler) {
	bot.action(pattern, async (ctx) => {
		try {
			await ctx.answerCbQuery().catch(() => null);

			if (ctx.scene && ctx.scene.current) {
				try {
					await ctx.scene.leave();
				} catch (e) {
					console.error("leave scene error:", e);
				}
			}

			await handler(ctx);
		} catch (err) {
			console.error("safeAction error:", err);
			try {
				await sendReplyAndDelete(
					ctx,
					"یه خطایی پیش اومد، دوباره امتحان کن 🚧",
					undefined,
					5000
				);
			} catch {}
		}
	});
}

module.exports = safeAction;
