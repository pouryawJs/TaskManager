const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ScoreLogModel = prisma.scoreLog;

exports.createNewLog = async (user, score, reason, dayTag) => {
	const log = await ScoreLogModel.create({
		data: { userId: user, score, reason, dayTag },
	});

	return log ? log : false;
};

exports.totalScoreOfDay = async (userId, dayTag) => {
	const result = await ScoreLogModel.aggregate({
		where: { userId, dayTag },
		_sum: { score: true },
	});

	return result._sum.score || 0;
};
