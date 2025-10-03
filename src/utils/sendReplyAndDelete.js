module.exports = async (ctx, replyText, userMessageID, timeToDelete) => {
	const sent = await ctx
		.reply(replyText, { parse_mode: "HTML" })
		.catch((e) => console.log("send message error", e));

	if (sent && sent.message_id) {
		const chatId = ctx.chat.id;
		const botMessageID = sent.message_id;

		setTimeout(async () => {
			try {
				if (userMessageID) {
					await ctx.telegram.deleteMessage(
						String(chatId),
						userMessageID
					);
				}
				await ctx.telegram.deleteMessage(String(chatId), botMessageID);
			} catch (e) {
				return console.log(e);
			}
		}, timeToDelete);
	}
};
