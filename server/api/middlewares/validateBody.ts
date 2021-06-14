import { isEqual } from "lodash";
import errorlog from "../../utils/errorlog";

export function validateBody(keys: { [key: string]: true }, body: object): boolean;
export function validateBody(keys: string, body: object): boolean;
export function validateBody(keys: string[], body: object): boolean;

export function validateBody(keys: unknown, body: object): boolean {
	const keysArr: string[] = [];
	try {
		if (typeof keys === "string") {
			keysArr.push(keys);
		} else if (typeof keys === "object") {
			for (const property in keys) {
				keysArr.push(property);
			}
		} else if (Array.isArray(keys)) {
			keys.forEach((key: string) => {
				keysArr.push(key);
			});
		} else {
			throw new Error("Invalid keys argument.");
		}

		return isEqual(keysArr, Object.keys(body));
	} catch (error) {
		errorlog(error);
		return false;
	}
}
