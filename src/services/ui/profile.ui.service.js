const profileKeyboard = require("./../../bot/keyboards/profile.keyboard");
const profileMessages = require("./../../bot/messages/profile.message");
const scoreLogService = require("./../scoreLog.service");
const taskService = require("./../task.service");
const userService = require("./../user.service");

exports.showProfile = async (ctx) => {
	const userID = ctx.from.id;

	const user = await userService.findUser(userID);

	// Score
	const totalScore = await scoreLogService.totalScoreOfUser(userID);
	// Tasks
	const tasks = await taskService.findAllUserTasks(userID);
	const doneLen = tasks.filter((t) => t.status === "تکمیل شده 🟢").length;
	const halfDoneLen = tasks.filter(
		(t) => t.status === "نیمه تمام ماند 🟤"
	).length;
	const notDoneLen = tasks.filter((t) => t.status === "انجام نشد 🔴").length;
	const cenceledLen = tasks.filter((t) => t.status === "لغو شده ⛔️").length;

	await ctx.editMessageText(
		profileMessages.pofile(
			totalScore,
			doneLen,
			halfDoneLen,
			notDoneLen,
			cenceledLen,
			user.endTime
		),
		{
			parse_mode: "HTML",
			...profileKeyboard.profile(),
		}
	);
};
