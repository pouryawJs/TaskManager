const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ScoreLogModel = prisma.scoreLog;

exports.createNewLog = async (user, score, reason, dayTag) => {
	const log = await ScoreLogModel.create({
		data: { userId: user, score, reason, dayTag },
	});

	return log ? log : false;
};
