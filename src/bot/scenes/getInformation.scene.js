const { Scenes } = require("telegraf");
const { WizardScene } = Scenes;
const infoKeyboard = require("./../keyboards/information.keyboard");
const infoMessages = require("./../messages/information.messages");
const sendReplyAndDelete = require("../../utils/sendReplyAndDelete");
const mainMenuUI = require("../../services/ui/mainMenu.ui.service");
const userService = require("./../../services/user.service");

const ENDTIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

const parseEndTime = (text) => {
	const match = text.trim().match(ENDTIME_REGEX)[0];

	if (!match) return null;
	return match;
};

const addTaskScene = new WizardScene(
	"GET_INFORMATION_SCENE",
	async (ctx) => {
		try {
			await ctx.answerCbQuery().catch(() => null);
			await ctx.editMessageText(infoMessages.getEndTimeOfTheDay(), {
				parse_mode: "HTML",
				...infoKeyboard.nextStep,
			});
			return ctx.wizard.next();
		} catch (e) {
			console.error(e);
		}
	},
	async (ctx) => {
		try {
			if (ctx.callbackQuery?.data) {
				await ctx.answerCbQuery().catch(() => null);
				ctx.scene.leave();
				return mainMenuUI.showMainMenu(ctx);
			}
			const messageID = ctx.message?.message_id;
			const text = ctx.message?.text ? ctx.message.text.trim() : "";

			const endTime = parseEndTime(text);

			if (!endTime) {
				return await sendReplyAndDelete(
					ctx,
					infoMessages.incorrectEndTimeFormat(),
					messageID,
					15000
				);
			}

			const userID = ctx.from.id;
			await userService.updateUserEndTime(userID, endTime);

			await sendReplyAndDelete(
				ctx,
				infoMessages.thanksForInformation(endTime),
				messageID,
				10000
			);
		} catch (e) {
			console.error(e);
		}
	}
);

module.exports = addTaskScene;
