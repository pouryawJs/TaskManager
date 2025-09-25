const manageProgramKeyboard = require("./../keyboards/manageProgram.keyboard");
const manageProgramMessage = require("./../messages/manageProgram.message");
const safeAction = require("./../../utils/safeAction");
const manageProgramUI = require("./../../services/ui/manageProgram.ui.service");

module.exports = (bot) => {
	safeAction(
		bot,
		"PROGRAM_MANAGEMENT",
		async (ctx) => await manageProgramUI.showProgramManagementMenu(ctx)
	);

	//* TODAY TASKS HANDLERS
	safeAction(
		bot,
		"TODAY_TASKS",
		async (ctx) => await manageProgramUI.showTodayTaskMenu(ctx)
	);

	safeAction(bot, "ADD_TASK", (ctx) => ctx.scene.enter("ADD_TASK_SCENE"));

	safeAction(
		bot,
		"DELETE_TASK",
		async (ctx) => await manageProgramUI.showDeleteTaskMenu(ctx)
	);

	//* PAST TASKS HANDLERS
	safeAction(
		bot,
		/PAST_DAYS_PAGE_(\d+)$/,
		async (ctx) => await manageProgramUI.showPastDaysMenu(ctx)
	);
	//* GUIDE TASKS HANDLERS

	//* ANALYS TASKS HANDLERS
	safeAction(
		bot,
		"ANALYS_TASKS",
		async (ctx) => await manageProgramUI.showAnalysTasksMenu(ctx)
	);
};
