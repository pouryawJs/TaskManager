const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		_id: { type: String, required: true },
		score: { type: Number, default: 0 },
		end_time: { type: String, default: "00:00" },
	},
	{ timestamp: true, versionKey: false }
);

const model = mongoose.model("User", userSchema);

module.exports = model;
