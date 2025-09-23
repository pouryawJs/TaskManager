const startHandler = require("./handlers/start.handler");
const mainMenuHandler = require("./handlers/mainMenu.handlers");
const manageProgramHandlers = require("./handlers/manageProgram.handlers");

module.exports = (bot) => {
	startHandler(bot);
	mainMenuHandler(bot);
	manageProgramHandlers(bot);
};
