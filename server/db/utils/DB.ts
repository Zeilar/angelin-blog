import { injectable } from "inversify";
import { Logger } from "../../utils";

@injectable()
export class DB {
	constructor(public readonly logger: Logger) {}

	public async count(query: any): Promise<number> {
		console.log(this.logger);
		try {
			return (await query.count(["id", { as: "count" }]).first()).count;
		} catch (error) {
			this.logger.error(error);
			return 0;
		}
	}
}
