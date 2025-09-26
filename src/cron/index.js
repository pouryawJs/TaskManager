const { checkStartTaskJob } = require("./task.cron");

function setupCrons(bot) {
	checkStartTaskJob(bot);
}

module.exports = setupCrons;
