const { checkStartTaskJob, checkEndedTaskJob } = require("./task.cron");

function setupCrons(bot) {
	checkStartTaskJob(bot);
	checkEndedTaskJob(bot);
}

module.exports = setupCrons;
