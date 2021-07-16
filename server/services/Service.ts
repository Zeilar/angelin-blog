import { injectable } from "inversify";
import errorlog from "../utils/errorlog";

@injectable()
export class Service {
	protected readonly errorlog = errorlog;
}
