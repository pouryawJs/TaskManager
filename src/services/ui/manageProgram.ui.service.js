const manageProgramMessage = require("../../bot/messages/manageProgram.message");
const manageProgramKeyboard = require("../../bot/keyboards/manageProgram.keyboard");

exports.showProgramManagementMenu = async (ctx) => {
	await ctx.editMessageText(manageProgramMessage.mainManageProgramMenu(), {
		parse_mode: "HTML",
		...manageProgramKeyboard.mainManageProgramMenu(),
	});
};

exports.showTodayTaskMenu = async (ctx) => {
	await ctx.editMessageText(manageProgramMessage.todayTasks(), {
		parse_mode: "HTML",
		...manageProgramKeyboard.todayTasks(),
	});
};

exports.showDeleteTaskMenu = async (ctx) => {
	await ctx.editMessageText(manageProgramMessage.deleteTask(), {
		parse_mode: "HTML",
		...manageProgramKeyboard.deleteTask(),
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
