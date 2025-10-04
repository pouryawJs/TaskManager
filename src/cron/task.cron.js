const cron = require("node-cron");
const { getTehranTime, nowInTehranUTC } = require("./../utils/dateUtils");
const taskService = require("./../services/task.service");
const manageProgramUI = require("./../services/ui/manageProgram.ui.service");

exports.checkStartTaskJob = async (bot) => {
	// Each Minute
	cron.schedule("* * * * *", async () => {
		try {
			const now = new Date();

			const tasks = await taskService.findTasksByStartTime(now);
			const sentTasks = [];

			for (let task of tasks) {
				const sentMsgId = await manageProgramUI.showStartedTask(
					bot,
					task
				);
				sentTasks.push({
					id: task.id,
					notificationMsgId: sentMsgId,
					status: "درحال انجام 🟡",
				});
			}

			if (sentTasks.length) {
				await taskService.updateTasksAfterSentNotification(sentTasks);
			}
		} catch (err) {
			console.error("[CRON ERROR]", err);
		}
	});
};

exports.checkEndedTaskJob = async (bot) => {
	// Each Minute
	cron.schedule("* * * * *", async () => {
		try {
			const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

			const tasks = await taskService.findAndUpdateExpiredTasks(
				thirtyMinutesAgo
			);

			if (tasks.length) {
				for (let task of tasks) {
					await manageProgramUI.sendExpiredTaskNotif(bot, task);
				}
			}
		} catch (err) {
			console.error("[CRON ERROR]", err);
		}
	});
};
