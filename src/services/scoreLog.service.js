const ScoreLogModel = require("./../models/ScoreLog");

exports.createNewLog = async (user, score, reason) => {
	const log = await ScoreLogModel.create({ user, score, reason });

	return log ? log : false;
};
