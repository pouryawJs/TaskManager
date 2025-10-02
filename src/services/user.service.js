const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const UserModel = prisma.user;
const jalaali = require("jalaali-js");

exports.getAllActivatedUsers = async () => {
	const users = await UserModel.findMany({
		where: { score: { gt: 10 } },
	});
	return users;
};

exports.findUser = async (userID) => {
	const user = await UserModel.findUnique({ where: { id: Number(userID) } });

	return user ? user : false;
};

exports.createUser = async (userID, username) => {
	const user = await UserModel.create({
		data: { id: Number(userID), username: username ? username : "None" },
	});

	return user ? user : false;
};

exports.getUserCurrentDayTag = async (userID) => {
	const user = await UserModel.findUnique({ where: { id: Number(userID) } });

	const now = new Date();

	const [endHour, endMinute] = (user.endTime || "0:0").split(":").map(Number);

	const endTimeToday = new Date(now);
	endTimeToday.setHours(endHour, endMinute, 0, 0);

	let effectiveDate = new Date(now);

	if (now > endTimeToday) {
		effectiveDate.setDate(effectiveDate.getDate() + 1);
	}

	const j = jalaali.toJalaali(
		effectiveDate.getFullYear(),
		effectiveDate.getMonth() + 1,
		effectiveDate.getDate()
	);

	const year = j.jy;
	const month = String(j.jm).padStart(2, "0");
	const day = String(j.jd).padStart(2, "0");

	return `${year}/${month}/${day}`;
};

exports.updateUserScore = async (userID, amount) => {
	const updatedUser = await UserModel.update({
		where: { id: Number(userID) },
		data: { score: { increment: amount } },
		select: { id: true, score: true },
	});

	return updatedUser ? updatedUser : false;
};

exports.getLimitTimeInMinute = async (userID) => {
	const user = await UserModel.findUnique({ where: { id: Number(userID) } });

	const end = user.endTime || "00:00";
	const [hour, minute] = end.split(":").map(Number);
	const endInMinute = hour * 60 + minute;

	return endInMinute + 8 * 60; // 8 hour after end day
};

exports.updateUserEndTime = async (userID, endTime) => {
	const updatedUser = await UserModel.update({
		where: { id: Number(userID) },
		data: { endTime },
	});
	return updatedUser ? updatedUser : false;
};
