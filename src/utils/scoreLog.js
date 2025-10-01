const sendReplyAndDelete = require("./sendReplyAndDelete");

const increasedScoreLog = (total, addedScore, reason) => `
🔥 <b>افزایش امتیاز</b> 🔥

📌 مقدار: <b>${addedScore}</b>
📝 دلیل: <b>${reason}</b>

📊 مجموع امتیازات: <b>${total}</b>  
`;

const decreasedScoreLog = (total, decreasedScore, reason) => `
⚠️ <b>کسر امتیاز</b> ⚠️

📌 مقدار: <b>${decreasedScore}</b>
📝 دلیل: <b>${reason}</b>

📊 مجموع امتیازات: <b>${total}</b>  
`;
exports.sendLog = async (ctx, result, isIncrease) => {
	const userTotalScore = result.user.score;
	let logMessage = "";
	if (isIncrease) {
		logMessage = increasedScoreLog(
			userTotalScore,
			result.log.score,
			result.log.reason
		);
	} else {
		logMessage = decreasedScoreLog(
			userTotalScore,
			result.log.score,
			result.log.reason
		);
	}
	return await sendReplyAndDelete(ctx, logMessage, undefined, 10000);
};
