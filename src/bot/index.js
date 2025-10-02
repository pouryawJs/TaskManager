const startHandler = require("./handlers/start.handler");
const mainMenuHandler = require("./handlers/mainMenu.handlers");
const manageProgramHandlers = require("./handlers/manageProgram.handlers");
const informationHandler = require("./handlers/information.handler");
const profileHandler = require("./handlers/profile.handler");
const setupStage = require("./stage");
const adminHandler = require("./handlers/admin.handler");

module.exports = (bot) => {
	// scenes
	setupStage(bot);

	// handlers
	startHandler(bot);
	mainMenuHandler(bot);
	manageProgramHandlers(bot);
	informationHandler(bot);
	profileHandler(bot);
	adminHandler(bot);
};
