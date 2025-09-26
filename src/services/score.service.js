const userService = require("./user.service");
const scoreLogService = require("./scoreLog.service");
const { getTehranTime, getCurrentTimeInMinute } = require("../utils/dateUtils");

const giveReward = async (userID, score, reason) => {
	const updatedUser = await userService.updateUserScore(userID, score);

	if (!updatedUser) {
		return false;
	}

	const log = await scoreLogService.createNewLog(userID, score, reason);

	return { user: updatedUser, log };
};

exports.firstTaskOfDayReward = async (userID) => {
	return giveReward(userID, 10, "اضافه کردن اولین تسک روز در موقع درست 🔥");
};
exports.firstTaskOfDayPunish = async (userID) => {
	return giveReward(userID, -10, "وارد کردن اولین تسک روز با تاخیر زیاد 😴");
};

//! NEED TO RE-CHECK
exports.startTaskReward = async (task) => {
	const userID = task.user;
	const score = 2;
	//* is Eligible?
	const [startHour, startMin] = task.start.split(":").map(Number);
	const startMinutes = startHour * 60 + startMin;
	const currentTime = getCurrentTimeInMinute();

	//* 5 Minute after starting task
	if (currentTime - startMinutes >= 5) {
		return { isEligible: false };
	}

	const result = await giveReward(userID, score, "شروع به موفع تسک 👀");

	return {
		...result,
		isEligible: true,
	};
};

exports.doneTaskReward = async (userID, duration) => {
	let score = Math.min(20, Math.floor(duration / 7) + 1);

	return giveReward(userID, score, "تکمیل کردن تسک 📝✅");
};

exports.halfDoneTaskReward = async (userID, duration) => {
	const score = Math.min(10, Math.floor(duration / 30) + 1);

	return giveReward(userID, score, "انجام دادن بخشی از تسک ✍️");
};

exports.notDoneTaskReward = async (userID, duration) => {
	const score = -1 * Math.min(20, Math.floor(duration / 15) + 1);

	return giveReward(userID, score, "انجام ندادن تسک ❌");
};

exports.cancelTaskReward = async (userID, duration) => {
	const score = -1 * Math.min(10, Math.floor(duration / 30) + 1);

	return giveReward(userID, score, "لغو کردن تسک ⛔️");
};
