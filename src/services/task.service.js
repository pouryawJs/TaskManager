const TaskModel = require("./../models/Task");

exports.insertManyTasks = async (tasks) => {
	const result = await TaskModel.insertMany(tasks);
	if (result.insertedCount === 0) {
		return false;
	}
	return true;
};

exports.getUserTasksByDayTag = async (userID, dayTag) => {
	const tasks = await TaskModel.aggregate([
		{ $match: { user: String(userID), dayTag: String(dayTag) } },
		{
			$addFields: {
				sortHour: {
					$toInt: { $arrayElemAt: [{ $split: ["$start", ":"] }, 0] },
				},
				sortMinute: {
					$toInt: { $arrayElemAt: [{ $split: ["$start", ":"] }, 1] },
				},
			},
		},
		{ $sort: { sortHour: 1, sortMinute: 1 } },
	]);
	return tasks;
};

exports.deleteTaskByID = async (taskID) => {
	await TaskModel.findByIdAndDelete(taskID);
	return;
};

exports.findTasksByStartTime = async (start) => {
	const tasks = await TaskModel.find({
		start,
		isSentNotification: false,
	}).lean();

	return tasks;
};

exports.updateTaskStatus = async (taskID, status) => {
	const updatedTask = await TaskModel.findByIdAndUpdate(
		taskID,
		{ status },
		{ new: true }
	);

	return updatedTask ? updatedTask : false;
};

exports.updateTasksAfterSentNotification = async (tasks) => {
	await TaskModel.bulkWrite(tasks);
	return;
};

exports.isFirstTaskInDayTag = async (userID, dayTag) => {
	const task = await TaskModel.findOne({ user: userID, dayTag });
	return task ? false : true;
};
