const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		telegram_id: { type: String, required: true },
		score: { type: Number, default: 0 },
		end_time: { type: Number, default: 0 },
	},
	{ timestamp: true, versionKey: false }
);

const model = mongoose.model("User", userSchema);

module.exports = model;
