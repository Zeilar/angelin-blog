const path = require("path");
const fs = require("fs");

function errorLog(error) {
	console.error(error);

	const filePath = path.join(__dirname, "../../errorlog.txt");
	const content = `${new Date()}\n${error.stack}`;

	if (fs.existsSync(filePath)) {
		fs.appendFile(filePath, `\n\n${content}`, error => error && console.error(error));
	} else {
		fs.writeFile(filePath, `${content}`, error => error && console.error(error));
	}
}

module.exports = errorLog;
