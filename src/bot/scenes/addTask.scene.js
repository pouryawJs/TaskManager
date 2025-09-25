const { Scenes } = require("telegraf");
const { WizardScene } = Scenes;
const manageProgramMessage = require("./../messages/manageProgram.message");
const manageProgramKeyboard = require("./../keyboards/manageProgram.keyboard");
const taskService = require("./../../services/task.service");
const userService = require("./../../services/user.service");

const TASK_REGEX =
	/^(.+?)\s+از\s+([0-2]?\d:[0-5]\d)\s+تا\s+([0-2]?\d:[0-5]\d)\s*$/i;

const parseTaskProperties = (text) => {
	const taskMessage = text.trim().match(TASK_REGEX);
	if (!taskMessage) return null;
	const title = taskMessage[1].trim();
	const start = taskMessage[2];
	const end = taskMessage[3];
	return { title, start, end };
};

const sendReplyAndDelete = async (
	ctx,
	replyText,
	userMessageID,
	timeToDelete
) => {
	const sent = await ctx
		.reply(replyText, { parse_mode: "HTML" })
		.catch(() => null);
	if (sent && sent.message_id) {
		const chatId = ctx.chat.id;
		const botMessageID = sent.message_id;

		setTimeout(async () => {
			try {
				if (userMessageID) {
					await ctx.telegram.deleteMessage(chatId, userMessageID);
				}
				await ctx.telegram.deleteMessage(chatId, botMessageID);
			} catch (e) {
				return console.log(e);
			}
		}, timeToDelete);
	}
};

const addTaskScene = new WizardScene(
	"ADD_TASK_SCENE",
	async (ctx) => {
		await ctx.answerCbQuery().catch(() => null);
		await ctx.editMessageText(manageProgramMessage.addTask(), {
			parse_mode: "HTML",
			...manageProgramKeyboard.addTask(),
		});
		return ctx.wizard.next();
	},
	async (ctx) => {
		if (ctx.callbackQuery?.data === "TODAY_TASKS") {
			await ctx.answerCbQuery().catch(() => null);
			ctx.scene.leave();

			return await ctx.editMessageText(
				manageProgramMessage.todayTasks(),
				{
					parse_mode: "HTML",
					...manageProgramKeyboard.todayTasks(),
				}
			);
		}

		const userTgID = ctx.from.id;
		// Get Day Tag ANd Insert docs
		const dayTag = await userService.getUserCurrentDayTag(userTgID);
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
					15000
				);
			}
			tasks.push({ ...taskProperties, dayTag });
		}

		const addTasksResult = await taskService.insertManyTasks(tasks);

		if (!addTasksResult) {
			await ctx.telegram.deleteMessage(chatID, messageID);
			await sendReplyAndDelete(
				ctx,
				manageProgramMessage.addTaskInsertionErr(),
				messageID,
				10000
			);
		}

		await ctx.telegram.deleteMessage(chatID, messageID);
		await sendReplyAndDelete(
			ctx,
			manageProgramMessage.addTaskSuccess(tasks.length),
			10000
		);
	}
);

module.exports = addTaskScene;
