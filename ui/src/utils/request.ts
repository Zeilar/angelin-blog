import { Args } from "../types/request";
import { SERVER_URL } from "./constants";

export default class Request {
	private static async request<T>(args: Args) {
		let data: T | null = null;
		let code: number = 200;
		try {
			const response = await fetch(args.url, {
				method: args.method,
				body: JSON.stringify(args.body),
				headers: { "Content-Type": "application/json" },
			});

			code = response.status;

			if (args.withResponse) data = await response.json();
		} catch (error) {
			code = 500;
			console.error(error);
		} finally {
			return { data, code };
		}
	}

	public static async auth<T>(args: Args) {
		const url = `${SERVER_URL}/api/users/${args.url}`;
		return await Request.request<T>({ ...args, url, withResponse: true });
	}
}
