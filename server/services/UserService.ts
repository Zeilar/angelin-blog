import { Service } from "./Service";
import { injectable } from "inversify";

@injectable()
export class UserService extends Service {
	constructor() {
		super();
	}

	public async edit() {
		//
	}
}
