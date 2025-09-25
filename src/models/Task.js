const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		start: { type: String, required: true },
		end: { type: String, required: true },
		dayTag: { type: String, required: true },
	},
	{ timestamp: true, versionKey: false }
);

const model = mongoose.model("Task", taskSchema);

module.exports = model;
