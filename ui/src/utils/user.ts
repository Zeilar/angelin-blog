import { UserCredentials } from "../types/request";
import Request from "./Request";

export default class UserHelpers {
	public static async login<T>(user: UserCredentials) {
		return await Request.auth<T>({ url: "login", method: "POST", body: user });
	}

	public static async authenticate<T>() {
		return await Request.auth<T>({ url: "authenticate" });
	}
}
