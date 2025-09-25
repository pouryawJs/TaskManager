const manageProgramMessage = require("../../bot/messages/manageProgram.message");
const manageProgramKeyboard = require("../../bot/keyboards/manageProgram.keyboard");
const taskService = require("./../task.service");
const userService = require("./../user.service");

exports.showProgramManagementMenu = async (ctx) => {
	await ctx.editMessageText(manageProgramMessage.mainManageProgramMenu(), {
		parse_mode: "HTML",
		...manageProgramKeyboard.mainManageProgramMenu(),
	});
};

exports.showTodayTaskMenu = async (ctx) => {
	const userID = ctx.from.id;

	const dayTag = await userService.getUserCurrentDayTag(userID);
	const tasks = await taskService.getUserTasksByDayTag(userID, dayTag);

	await ctx.editMessageText(manageProgramMessage.todayTasks(tasks), {
		parse_mode: "HTML",
		...manageProgramKeyboard.todayTasks(),
	});
};

exports.showDeleteTaskMenu = async (ctx) => {
	const userID = ctx.from.id;

	const dayTag = await userService.getUserCurrentDayTag(userID);
	const tasks = await taskService.getUserTasksByDayTag(userID, dayTag);

	await ctx.editMessageText(manageProgramMessage.deleteTask(tasks), {
		parse_mode: "HTML",
		...manageProgramKeyboard.deleteTask(tasks),
	});
};

exports.showPastDaysMenu = async (ctx) => {
	const page = parseInt(ctx.match[1], 10);
	await ctx.answerCbQuery();
	ctx.editMessageText(manageProgramMessage.pastDays(), {
		parse_mode: "HTML",
		...manageProgramKeyboard.pastDays(page),
	});
};

exports.showAnalysTasksMenu = async (ctx) => {
	await ctx.editMessageText(manageProgramMessage.analysTasks(), {
		parse_mode: "HTML",
		...manageProgramKeyboard.analysTasks(),
	});
};
