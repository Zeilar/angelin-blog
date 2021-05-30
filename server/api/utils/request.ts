import _ from "lodash";
import errorlog from "../../utils/errorlog";

// Validate whether the req.body keys matches the keys array
export function validateBody(body: object, keys: string[]) {
	try {
		return _.difference(keys, Object.keys(body)).length === 0;
	} catch (error) {
		errorlog(error);
		return false;
	}
}

export function idsMatch(first: number, second: number) {
	try {
		return first === second;
	} catch (error) {
		errorlog(error);
		return false;
	}
}
