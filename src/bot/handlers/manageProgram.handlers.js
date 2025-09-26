const manageProgramKeyboard = require("./../keyboards/manageProgram.keyboard");
const manageProgramMessage = require("./../messages/manageProgram.message");
const safeAction = require("./../../utils/safeAction");
const manageProgramUI = require("./../../services/ui/manageProgram.ui.service");
const taskService = require("./../../services/task.service");
const sendReplyAndDelete = require("../../utils/sendReplyAndDelete");
const { getTehranTime } = require("../../utils/dateUtils");

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

	safeAction(bot, /^TASK_DELETE_(.+)$/, async (ctx) => {
		const taskID = ctx.match[1];

		await taskService.deleteTaskByID(taskID);
		await manageProgramUI.showDeleteTaskMenu(ctx);
		await sendReplyAndDelete(
			ctx,
			"تسک مورد نظر با موفقیت حذف شد 🗑✅",
			undefined,
			3000
		);
	});
	//* TASK MANAGEMENT
	safeAction(bot, /^PROGRESS_TASK_(.+)$/, async (ctx) =>
		manageProgramUI.showInProgressTask(ctx)
	);

	safeAction(bot, /^DONE_TASK_(.+)$/, async (ctx) =>
		manageProgramUI.doneTaskLogic(ctx)
	);

	safeAction(bot, /^HALF_DONE_TASK_(.+)$/, async (ctx) =>
		manageProgramUI.halfDoneTaskLogic(ctx)
	);

	safeAction(bot, /^NOT_DONE_TASK_(.+)$/, async (ctx) =>
		manageProgramUI.notDoneTaskLogic(ctx)
	);

	safeAction(bot, /^CANCEL_TASK_(.+)$/, async (ctx) =>
		manageProgramUI.cancelTaskLogic(ctx)
	);
	//* PAST TASKS HANDLERS
	safeAction(
		bot,
		/PAST_DAYS_PAGE_(\d+)$/,
		async (ctx) => await manageProgramUI.showPastDaysMenu(ctx)
	);

	safeAction(bot, /^DAY_(.+)$/, async (ctx) =>
		manageProgramUI.showDayTasks(ctx)
	);
	//* GUIDE TASKS HANDLERS

	//* ANALYS TASKS HANDLERS
	safeAction(
		bot,
		"ANALYS_TASKS",
		async (ctx) => await manageProgramUI.showAnalysTasksMenu(ctx)
	);
};
