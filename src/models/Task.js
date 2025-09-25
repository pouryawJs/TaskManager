const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		status: {
			type: String,
			required: true,
			default: "شروع نشده ⚪️",
			enum: [
				"شروع نشده ⚪️",
				"تکمیل شده 🟢",
				"درحال انجام 🟡",
				"نیمه تمام مانده است 🟤",
				"انجام نشد 🔴",
			],
		},
		start: { type: String, required: true },
		end: { type: String, required: true },
		dayTag: { type: String, required: true },
		user: { type: String, ref: "User", required: true },
	},
	{ timestamp: true, versionKey: false }
);

const model = mongoose.model("Task", taskSchema);

module.exports = model;
