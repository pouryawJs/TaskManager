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
				await ctx.reply("یه خطایی پیش اومد، دوباره امتحان کن 🚧");
			} catch {}
		}
	});
}

module.exports = safeAction;
