import path from "path";
import fs from "fs";

export default function errorlog(error: Error) {
	console.error(error);

	const filePath = path.join(__dirname, "../../errorlog.txt");
	const content = `${new Date()}\n${error.stack}`;

	if (fs.existsSync(filePath)) {
		fs.appendFile(filePath, `\n\n${content}`, error => error && console.error(error));
	} else {
		fs.writeFile(filePath, `${content}`, error => error && console.error(error));
	}
}
