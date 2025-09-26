const { Scenes } = require("telegraf");
const { WizardScene } = Scenes;
const manageProgramMessage = require("./../messages/manageProgram.message");
const manageProgramKeyboard = require("./../keyboards/manageProgram.keyboard");
const taskService = require("./../../services/task.service");
const userService = require("./../../services/user.service");
const manageProgramUI = require("./../../services/ui/manageProgram.ui.service");
const sendReplyAndDelete = require("../../utils/sendReplyAndDelete");
const { getCurrentTimeInMinute } = require("../../utils/dateUtils");
const {
	firstTaskOfDayReward,
	firstTaskOfDayPunish,
} = require("../../services/score.service");
const { sendLog } = require("../../utils/scoreLog");

const TASK_REGEX =
	/^(.+?)\s+از\s+([01]\d|2[0-3]):([0-5]\d)\s+تا\s+([01]\d|2[0-3]):([0-5]\d)\s*$/;

const parseTaskProperties = (text) => {
	const taskMessage = text.trim().match(TASK_REGEX);
	if (!taskMessage) return null;

	const title = taskMessage[1].trim();
	const start = `${taskMessage[2]}:${taskMessage[3]}`;
	const end = `${taskMessage[4]}:${taskMessage[5]}`;

	return { title, start, end };
};

const addTaskScene = new WizardScene(
	"ADD_TASK_SCENE",
	async (ctx) => {
		try {
			await ctx.answerCbQuery().catch(() => null);
			await ctx.editMessageText(manageProgramMessage.addTask(), {
				parse_mode: "HTML",
				...manageProgramKeyboard.addTask(),
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

				return await manageProgramUI.showTodayTaskMenu(ctx);
			}

			const userID = ctx.from.id;
			// Get Day Tag ANd Insert docs
			const dayTag = await userService.getUserCurrentDayTag(userID);
			const messageID = ctx.message?.message_id;
			const chatID = ctx.chat.id;
			const text = ctx.message?.text ? ctx.message.text.trim() : "";

			const lines = text.split("\n").map((line) => line.trim());

			const tasks = [];

			for (let line of lines) {
				const taskProperties = parseTaskProperties(line);
				if (!taskProperties) {
					return await sendReplyAndDelete(
						ctx,
						manageProgramMessage.addTaskFormatErr(),
						messageID,
						45000
					);
				}
				tasks.push({ ...taskProperties, dayTag, user: userID });
			}
			//* Reward/Punish Calculation
			const isFirstTask = await taskService.isFirstTaskInDayTag(
				userID,
				dayTag
			);
			if (isFirstTask) {
				const currentTime = getCurrentTimeInMinute();
				const userLimitTimeToGetReward =
					await userService.getLimitTimeInMinute(userID);
				if (currentTime <= userLimitTimeToGetReward) {
					const result = await firstTaskOfDayReward(userID);
					await sendLog(ctx, result, true);
				} else {
					const result = await firstTaskOfDayPunish(userID);
					await sendLog(ctx, result, false);
				}
			}

			//* add Task to DB
			const addTasksResult = await taskService.insertManyTasks(tasks);

			if (!addTasksResult) {
				await ctx.telegram.deleteMessage(chatID, messageID);
				await sendReplyAndDelete(
					ctx,
					manageProgramMessage.addTaskInsertionErr(),
					messageID,
					45000
				);
			}
			//* Response
			await ctx.telegram.deleteMessage(chatID, messageID);
			await sendReplyAndDelete(
				ctx,
				manageProgramMessage.addTaskSuccess(tasks.length),
				undefined,
				10000
			);
		} catch (e) {
			console.error(e);
		}
	}
);

module.exports = addTaskScene;
