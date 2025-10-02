const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const TaskModel = prisma.task;

exports.insertManyTasks = async (tasks) => {
	const result = await TaskModel.createMany({ data: tasks });

	if (result.count === 0) {
		return false;
	}

	return true;
};

exports.getUserTasksByDayTag = async (userID, dayTag) => {
	const tasks = await prisma.$queryRaw`
		SELECT * FROM "Task"
		WHERE "userId" = ${Number(userID)} AND "dayTag" = ${dayTag}
		ORDER BY split_part("start", ':', 1)::int,
				split_part("start", ':', 2)::int;
		`;
	return tasks;
};

exports.deleteTaskByID = async (taskID) => {
	await TaskModel.delete({ where: { id: Number(taskID) } });
	return;
};

exports.findTasksByStartTime = async (start) => {
	const tasks = await TaskModel.findMany({ where: { start } });

	return tasks;
};

exports.updateTaskStatus = async (taskID, status) => {
	const updatedTask = await TaskModel.update({
		where: { id: Number(taskID) },
		data: { status },
	});

	return updatedTask ? updatedTask : false;
};

exports.updateTasksAfterSentNotification = async (tasks) => {
	await Promise.all(
		tasks.map(async (task) => {
			await TaskModel.update({
				where: { id: task.id },
				data: { isSentNotification: task.isSentNotification },
			});
		})
	);
	return;
};

exports.isFirstTaskInDayTag = async (userID, dayTag) => {
	const task = await TaskModel.findFirst({
		where: { userId: Number(userID), dayTag },
	});
	return task ? false : true;
};

exports.findAllUserTasks = async (userId) => {
	const tasks = await TaskModel.findMany({ where: { userId } });

	return tasks;
};
