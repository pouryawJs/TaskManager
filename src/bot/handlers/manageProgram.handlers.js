const manageProgramKeyboard = require("./../keyboards/manageProgram.keyboard");
const manageProgramMessage = require("./../messages/manageProgram.message");
const safeAction = require("./../../utils/safeAction");

module.exports = (bot) => {
	bot.action("PROGRAM_MANAGEMENT", (ctx) => {
		ctx.editMessageText(manageProgramMessage.mainManageProgramMenu(), {
			parse_mode: "HTML",
			...manageProgramKeyboard.mainManageProgramMenu(),
		});
	});

	//* TODAY TASKS HANDLERS
	safeAction(bot, "TODAY_TASKS", async (ctx) => {
		await ctx.editMessageText(manageProgramMessage.todayTasks(), {
			parse_mode: "HTML",
			...manageProgramKeyboard.todayTasks(),
		});
	});

	bot.action("ADD_TASK", async (ctx) => {
		await ctx.answerCbQuery();
		return ctx.scene.enter("ADD_TASK_SCENE");
	});

	bot.action("DELETE_TASK", (ctx) => {
		ctx.editMessageText(manageProgramMessage.deleteTask(), {
			parse_mode: "HTML",
			...manageProgramKeyboard.deleteTask(),
		});
	});

	//* PAST TASKS HANDLERS
	bot.action(/PAST_DAYS_PAGE_(\d+)$/, async (ctx) => {
		const page = parseInt(ctx.match[1], 10);
		await ctx.answerCbQuery();
		ctx.editMessageText(manageProgramMessage.pastDays(), {
			parse_mode: "HTML",
			...manageProgramKeyboard.pastDays(page),
		});
	});
	//* GUIDE TASKS HANDLERS

	//* ANALYS TASKS HANDLERS
	bot.action("ANALYS_TASKS", (ctx) => {
		ctx.editMessageText(manageProgramMessage.analysTasks(), {
			parse_mode: "HTML",
			...manageProgramKeyboard.analysTasks(),
		});
	});
};
