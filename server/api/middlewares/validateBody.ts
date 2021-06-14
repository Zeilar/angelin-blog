import { difference } from "lodash";
import errorlog from "../../utils/errorlog";

export function validateBody(keys: string[], body: object): boolean;
export function validateBody(keys: string, body: object): boolean;
export function validateBody(keys: { [key: string]: true }, body: object): boolean;

export function validateBody(keys: unknown, body: object): boolean {
	let keysArr: string[] = [];
	try {
		if (typeof keys === "string") {
			keysArr.push(keys);
		} else if (Array.isArray(keys)) {
			keysArr = keys;
		} else if (typeof keys === "object") {
			for (const property in keys) {
				keysArr.push(property);
			}
		} else {
			throw new Error("Invalid keys argument.");
		}

		return difference(keysArr, Object.keys(body)).length === 0;
	} catch (error) {
		errorlog(error);
		return false;
	}
}
