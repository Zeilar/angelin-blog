import _ from "lodash";
import errorlog from "../../utils/errorlog";

export function idsMatch(first: number, second: number): boolean {
	try {
		return first === second;
	} catch (error) {
		errorlog(error);
		return false;
	}
}
