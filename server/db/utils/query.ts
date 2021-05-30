import errorlog from "../../utils/errorlog";

export async function count(query: any) {
	try {
		return (await query.count(["id", { as: "count" }]).first()).count;
	} catch (e) {
		errorlog(e);
		return 0;
	}
}
