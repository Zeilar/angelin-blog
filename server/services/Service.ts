import { injectable } from "inversify";
import errorlog from "../utils/errorlog";

@injectable()
export class Service {
	public readonly errorlog = errorlog;
}
