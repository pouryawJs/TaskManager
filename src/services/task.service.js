const TaskModel = require("./../models/Task");

exports.insertManyTasks = async (tasks) => {
	const result = await TaskModel.insertMany(tasks);
	if (result.insertedCount === 0) {
		return false;
	}
	return true;
};
