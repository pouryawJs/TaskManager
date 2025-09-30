const manageProgramMessage = require("../../bot/messages/manageProgram.message");
const manageProgramKeyboard = require("../../bot/keyboards/manageProgram.keyboard");
const taskService = require("./../task.service");
const userService = require("./../user.service");
const scoreLogService = require("./../scoreLog.service");
const { getTaskDurtationInMinute } = require("../../utils/dateUtils");
const sendReplyAndDelete = require("../../utils/sendReplyAndDelete");
const {
	startTaskReward,
	doneTaskReward,
	notDoneTaskReward,
	halfDoneTaskReward,
	cancelTaskReward,
} = require("../score.service");
const { sendLog } = require("../../utils/scoreLog");

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

	await ctx.editMessageText(manageProgramMessage.pastDays(), {
		parse_mode: "HTML",
		...manageProgramKeyboard.pastDays(page),
	});
};

exports.showDayTasks = async (ctx) => {
	const dayTag = ctx.match[1];
	const userID = ctx.from.id;

	const tasks = await taskService.getUserTasksByDayTag(userID, dayTag);
	if (!tasks.length) {
		return await ctx.editMessageText(
			manageProgramMessage.notFoundTask(dayTag),
			{
				parse_mode: "HTML",
				...manageProgramKeyboard.pastDayInformation(),
			}
		);
	}

	const totalScore = await scoreLogService.totalScoreOfDay(userID, dayTag);

	const done = tasks.filter((t) => t.status === "تکمیل شده 🟢");
	const halfDone = tasks.filter((t) => t.status === "نیمه تمام ماند 🟤");
	const notDone = tasks.filter((t) => t.status === "انجام نشد 🔴");

	return await ctx.editMessageText(
		manageProgramMessage.tasksByDay(
			dayTag,
			totalScore,
			done,
			halfDone,
			notDone
		),
		{
			parse_mode: "HTML",
			...manageProgramKeyboard.pastDayInformation(),
		}
	);
};

exports.showAnalysTasksMenu = async (ctx) => {
	await ctx.editMessageText(manageProgramMessage.analysTasks(), {
		parse_mode: "HTML",
		...manageProgramKeyboard.analysTasks(),
	});
};

exports.showStartedTask = async (bot, task) => {
	const duration = getTaskDurtationInMinute(task.start, task.end);
	await bot.telegram.sendMessage(
		task.user,
		manageProgramMessage.startedTask(task, duration),
		{
			parse_mode: "HTML",
			...manageProgramKeyboard.startedTask(task._id),
		}
	);
};

exports.showInProgressTask = async (ctx) => {
	const taskID = ctx.match[1];

	const task = await taskService.updateTaskStatus(taskID, "درحال انجام 🟡");

	if (!task) {
		return await sendReplyAndDelete(
			ctx,
			"یه خطایی پیش اومد، دوباره امتحان کن 🚧",
			undefined,
			5000
		);
	}

	//* Check Eligiblity to get score
	const result = await startTaskReward(task);

	if (result.isEligible) {
		await sendLog(ctx, result, true);
	}

	const duration = getTaskDurtationInMinute(task.start, task.end);
	await ctx.editMessageText(
		manageProgramMessage.InProgressTask(task, duration),
		{
			parse_mode: "HTML",
			...manageProgramKeyboard.InProgressTask(task._id),
		}
	);
};

exports.cancelTaskLogic = async (ctx) => {
	const taskID = ctx.match[1];
	const messageID = ctx.callbackQuery?.message?.message_id;

	const task = await taskService.updateTaskStatus(taskID, "لغو شده ⛔️");
	if (!task) {
		return await sendReplyAndDelete(
			ctx,
			"یه خطایی پیش اومد، دوباره امتحان کن 🚧",
			undefined,
			5000
		);
	}
	//* Calculate and give score to user
	const chatID = task.user;
	await ctx.telegram.deleteMessage(chatID, messageID);

	const duration = getTaskDurtationInMinute(task.start, task.end);
	const result = await cancelTaskReward(chatID, duration);

	return sendLog(ctx, result, false);
};

exports.doneTaskLogic = async (ctx) => {
	const taskID = ctx.match[1];
	const messageID = ctx.callbackQuery?.message?.message_id;

	const task = await taskService.updateTaskStatus(taskID, "تکمیل شده 🟢");
	if (!task) {
		return await sendReplyAndDelete(
			ctx,
			"یه خطایی پیش اومد، دوباره امتحان کن 🚧",
			undefined,
			5000
		);
	}
	//* Calculate and give score to user
	const chatID = task.user;
	await ctx.telegram.deleteMessage(chatID, messageID);

	const duration = getTaskDurtationInMinute(task.start, task.end);
	const result = await doneTaskReward(chatID, duration);

	return sendLog(ctx, result, true);
};

exports.halfDoneTaskLogic = async (ctx) => {
	const taskID = ctx.match[1];
	const messageID = ctx.callbackQuery?.message?.message_id;

	const task = await taskService.updateTaskStatus(
		taskID,
		"نیمه تمام ماند 🟤"
	);
	if (!task) {
		return await sendReplyAndDelete(
			ctx,
			"یه خطایی پیش اومد، دوباره امتحان کن 🚧",
			undefined,
			5000
		);
	}
	//* Calculate and give score to user
	const chatID = task.user;
	await ctx.telegram.deleteMessage(chatID, messageID);

	const duration = getTaskDurtationInMinute(task.start, task.end);
	const result = await halfDoneTaskReward(chatID, duration);

	return sendLog(ctx, result, true);
};

exports.notDoneTaskLogic = async (ctx) => {
	const taskID = ctx.match[1];
	const messageID = ctx.callbackQuery?.message?.message_id;

	const task = await taskService.updateTaskStatus(taskID, "انجام نشد 🔴");
	if (!task) {
		return await sendReplyAndDelete(
			ctx,
			"یه خطایی پیش اومد، دوباره امتحان کن 🚧",
			undefined,
			5000
		);
	}
	//* Calculate and give score to user
	const chatID = task.user;
	await ctx.telegram.deleteMessage(chatID, messageID);

	const duration = getTaskDurtationInMinute(task.start, task.end);
	const result = await notDoneTaskReward(chatID, duration);

	return sendLog(ctx, result, false);
};
