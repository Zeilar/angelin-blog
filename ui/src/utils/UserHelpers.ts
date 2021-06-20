import { LoginCredentials } from "../types/request";
import { Request } from "./";

export class UserHelpers {
	public static async login<T>(user: LoginCredentials) {
		return await Request.auth<T>({ url: "login", method: "POST", body: user });
	}

	public static async register<T>(user: LoginCredentials) {
		return await Request.auth<T>({ url: "register", method: "POST", body: user });
	}

	public static async authenticate<T>() {
		return await Request.auth<T>({ url: "authenticate" });
	}

	public static async logout() {
		return await Request.auth({ url: "logout" });
	}
}
