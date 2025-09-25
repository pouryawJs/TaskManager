const { Scenes, session } = require("telegraf");
const Stage = Scenes.Stage;

const addTaskScene = require("./scenes/addTask.scene");

const stage = new Stage([addTaskScene]);

module.exports = (bot) => {
	bot.use(session());
	bot.use(stage.middleware());
};
