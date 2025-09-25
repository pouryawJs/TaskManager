const mongoose = require("mongoose");

const scoreLog = new mongoose.Schema(
	{
		user: { type: String, ref: "User", required: true },
		score: { type: Number, required: true },
		reason: { type: String, required: true },
	},
	{ timestamp: true, versionKey: false }
);

const model = mongoose.model("ScoreLog", scoreLog);

module.exports = model;
