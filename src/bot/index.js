const startHandler = require("./handlers/start.handler");
const mainMenuHandler = require("./handlers/mainMenu.handlers");
const manageProgramHandlers = require("./handlers/manageProgram.handlers");
const setupStage = require("./stage");

module.exports = (bot) => {
	// scenes
	setupStage(bot);

	// handlers
	startHandler(bot);
	mainMenuHandler(bot);
	manageProgramHandlers(bot);
};
