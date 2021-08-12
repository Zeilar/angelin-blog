import path from "path";
import fs from "fs";
import dayjs from "dayjs";
import { injectable } from "inversify";

@injectable()
export class Logger {
	log(folder: string, message: string) {
		console.log(message); // TODO: remove in production

		const today = dayjs(new Date()).format("YYYY-MM-DD"),
			folderPath = path.join(__dirname, `../../${folder}`),
			filePath = path.join(folderPath, `${today}.txt`),
			content = `${new Date()}\n${message}`;

		function loggingError(error: NodeJS.ErrnoException | null) {
			if (error) console.error(`Error logging exception: ${error}`);
		}

		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath);
		}

		if (fs.existsSync(filePath)) {
			fs.appendFile(filePath, `\n\n${content}`, error => loggingError(error));
		} else {
			fs.writeFile(filePath, `${content}`, error => loggingError(error));
		}
	}

	public error(error: Error) {
		this.log("errors", error?.stack ?? "");
	}

	public warning(message: string) {
		this.log("warnings", message);
	}
}
