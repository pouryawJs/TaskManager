const ScoreLogModel = require("./../models/ScoreLog");

exports.createNewLog = async (user, score, reason, dayTag) => {
	const log = await ScoreLogModel.create({ user, score, reason, dayTag });

	return log ? log : false;
};

exports.totalScoreOfDay = async (userId, dayTag) => {
	const result = await ScoreLogModel.aggregate([
		{
			$match: { user: String(userId), dayTag },
		},
		{
			$group: {
				_id: null,
				total: { $sum: "$score" },
			},
		},
	]);

	return result.length > 0 ? result[0].total : 0;
};
