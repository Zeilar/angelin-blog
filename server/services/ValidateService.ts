import { HTTPError } from "./../utils/HTTPError";
import { difference } from "lodash";
import { injectable } from "inversify";
import { ErrorMessages } from "../api/utils";

@injectable()
export class ValidateService {
	/**
	 * @description Compares keys input to body object keys, and return whether they match or not
	 * @example requestBody(["username", "email"], { username: "john" ); // expected output: false
	 * @example requestBody("username", { username: "john" ); // expected output: true
	 * @example requestBody({ username: true }, { email: "mymail" ); // expected output: false
	 */
	requestBody(keys: string[], body: object): boolean;
	requestBody(keys: string, body: object): boolean;
	requestBody(keys: { [key: string]: true }, body: object): boolean;
	requestBody(keys: unknown, body: object) {
		if (!keys || !body) return false;

		let keysArr;

		if (typeof keys === "string") {
			keysArr = [keys];
		} else if (Array.isArray(keys)) {
			keysArr = keys;
		} else if (typeof keys === "object") {
			keysArr = Object.keys(keys as object);
		} else {
			throw new HTTPError(ErrorMessages.INVALID_INPUT, 400);
		}

		return difference(keysArr, Object.keys(body)).length === 0;
	}

	public register() {
		//
	}

	public createPost() {
		//
	}

	public editPost() {
		//
	}

	public createComment() {
		//
	}

	public editComment() {
		//
	}
}
