import { ErrorMessages } from "../utils";
import { injectable } from "inversify";
import { BaseHttpController } from "inversify-express-utils";

@injectable()
export class Controller extends BaseHttpController {
	public ErrorMessages = ErrorMessages;

	constructor() {
		super();
	}
}
