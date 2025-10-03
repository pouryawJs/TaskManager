const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const UserModel = prisma.user;
const jalaali = require("jalaali-js");
const { DateTime } = require("luxon");

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
	const tz = "Asia/Tehran";

	// TEHRAN TIME
	const nowTehran = DateTime.now().setZone(tz);

	const [endHour, endMinute] = (user?.endTime || "0:0")
		.split(":")
		.map(Number);

	let endToday = DateTime.fromObject(
		{
			year: nowTehran.year,
			month: nowTehran.month,
			day: nowTehran.day,
			hour: endHour,
			minute: endMinute,
			second: 0,
			millisecond: 0,
		},
		{ zone: tz }
	);

	let lastEnd;
	if (endToday <= nowTehran) {
		lastEnd = endToday;
	} else {
		lastEnd = endToday.minus({ days: 1 });
	}

	const gYear = lastEnd.year;
	const gMonth = lastEnd.month;
	const gDay = lastEnd.day;

	const j = jalaali.toJalaali(gYear, gMonth, gDay);

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
