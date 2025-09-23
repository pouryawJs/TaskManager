const manageProgramKeyboard = require("./../keyboards/manageProgram.keyboard");
const manageProgramMessage = require("./../messages/manageProgram.message");

module.exports = (bot) => {
	bot.action("PROGRAM_MANAGEMENT", (ctx) => {
		ctx.editMessageText(manageProgramMessage.mainManageProgramMenu(), {
			parse_mode: "HTML",
			...manageProgramKeyboard.mainManageProgramMenu(),
		});
	});

	//* TODAY TASKS HANDLERS

	bot.action("TODAY_TASKS", (ctx) => {
		ctx.editMessageText(manageProgramMessage.todayTasks(), {
			parse_mode: "HTML",
			...manageProgramKeyboard.todayTasks(),
		});
	});

	bot.action("ADD_TASK", (ctx) => {
		ctx.editMessageText(manageProgramMessage.addTask(), {
			parse_mode: "HTML",
			...manageProgramKeyboard.addTask(),
		});
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
