import path from "path";
import fs from "fs";
import dayjs from "dayjs";

/**
 * @description Writes caught errors to /errors/<date>.txt files
 */
export default function errorlog(error: Error) {
	console.error(error); // TODO: remove in production

	const today = dayjs(new Date()).format("YYYY-MM-DD"),
		folderPath = path.join(__dirname, "../../errors"),
		filePath = path.join(folderPath, `${today}.txt`),
		content = `${new Date()}\n${error?.stack}`;

	function fileError(error: NodeJS.ErrnoException | null) {
		if (error) console.error(`Error logging exception: ${error}`);
	}

	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
	}

	if (fs.existsSync(filePath)) {
		fs.appendFile(filePath, `\n\n${content}`, error => fileError(error));
	} else {
		fs.writeFile(filePath, `${content}`, error => fileError(error));
	}
}
