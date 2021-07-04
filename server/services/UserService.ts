import { Service } from "./Service";
import { Service as TService } from "typedi";

@TService()
export class UserService extends Service {
	constructor() {
		super();
	}

	public async edit() {
		//
	}
}
