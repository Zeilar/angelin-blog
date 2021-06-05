import { UserCredentials } from "../types/request";
import { authRequest } from "./request";

export async function login(user: UserCredentials) {
	return await authRequest({ url: "login", method: "POST", body: user });
}

export async function authenticate() {
	return await authRequest({ url: "authenticate" });
}
