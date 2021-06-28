import errorlog from "../../utils/errorlog";

export class DB {
	public static async count(query: any) {
		try {
			return (await query.count(["id", { as: "count" }]).first()).count;
		} catch (error) {
			errorlog(error);
			return 0;
		}
	}
}
