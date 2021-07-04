import { difference } from "lodash";
import { Service } from "./Service";

import { Service as TService } from "typedi";

@TService()
export class ValidateService extends Service {
	constructor() {
		super();
	}

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
			this.errorlog(error);
			return false;
		}
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
