import { Args } from "../types/request";
import { SERVER_URL } from "./constants";

export async function request(args: Args) {
	let data = null;
	let code: number = 200;
	try {
		const response = await fetch(args.url, {
			method: args?.method ?? "GET",
			body: JSON.stringify(args?.body),
			headers: { "Content-Type": "application/json" },
		});

		code = response.status;

		if (args.withResponse) data = await response.json();
	} catch (error) {
		console.error(error);
	} finally {
		return { data, code };
	}
}

export async function authRequest(args: Args) {
	args.url = `${SERVER_URL}/api/users/${args.url}`;
	return await request({ ...args, url: args.url, withResponse: true });
}
