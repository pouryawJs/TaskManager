const mongoose = require("mongoose");
const configs = require("../../configs.js");

module.exports = () => {
	try {
		mongoose.connect(configs.db.URI).then(() => {
			console.log(
				`DB Connected Successfully: ${mongoose.connection.host}`
			);
		});
	} catch (err) {
		console.log(`DB Error --> ${err}`);
		process.exit(1);
	}
};
