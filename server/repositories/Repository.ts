import { injectable } from "inversify";
import { DB } from "../db/utils/DB";
import errorlog from "../utils/errorlog";

@injectable()
export class Repository {
	public readonly DB = DB;
	public readonly errorlog = errorlog;
}
