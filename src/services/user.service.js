const UserModel = require("./../models/User");
const jalaali = require("jalaali-js");

exports.isExistsUser = async (userID) => {
	const user = await UserModel.findOne({ _id: userID });

	return user ? user : false;
};

exports.createUser = async (userID) => {
	const user = await UserModel.create({ _id: userID });

	return user ? user : false;
};

exports.getUserCurrentDayTag = async (userID) => {
	const user = await UserModel.findOne({ _id: userID });

	const now = new Date();

	const startHour = user.end_time || 0;

	let effectiveDate = new Date(now);
	if (now.getHours() < startHour) {
		effectiveDate.setDate(now.getDate() - 1);
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
