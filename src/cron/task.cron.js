const cron = require("node-cron");
const { getTehranTime } = require("./../utils/dateUtils");
const taskService = require("./../services/task.service");
const manageProgramUI = require("./../services/ui/manageProgram.ui.service");

exports.checkStartTaskJob = async (bot) => {
	// Each Minute
	cron.schedule("* * * * *", async () => {
		try {
			const time = getTehranTime();

			const tasks = await taskService.findTasksByStartTime(time);
			const sentTasks = [];

			for (let task of tasks) {
				await manageProgramUI.showStartedTask(bot, task);
				sentTasks.push({
					updateOne: {
						filter: { _id: task._id },
						update: { $set: { isSentNotification: true } },
					},
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
