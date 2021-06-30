import { difference } from "lodash";
import errorlog from "../../utils/errorlog";

/**
 * @description Compares keys input to body object keys, and return whether they match or not
 * @example validateBody(["username", "email"], { username: "john" ); // expected output: false
 * @example validateBody("username", { username: "john" ); // expected output: true
 * @example validateBody({ username: true }, { email: "mymail" ); // expected output: false
 */
export function validateBody(keys: string[], body: object): boolean;
export function validateBody(keys: string, body: object): boolean;
export function validateBody(keys: { [key: string]: true }, body: object): boolean;
export function validateBody(keys: unknown, body: object) {
	let keysArr;
	try {
		if (typeof keys === "string") {
			keysArr = [keys];
		} else if (Array.isArray(keys)) {
			keysArr = keys;
		} else if (typeof keys === "object") {
			keysArr = Object.keys(keys as object);
		} else {
			throw new Error("Invalid keys argument.");
		}
		return difference(keysArr, Object.keys(body)).length === 0;
	} catch (error) {
		errorlog(error);
		return false;
	}
}
