import { Args, QueryParams } from "../types/request";
import { SERVER_URL } from "./constants";

export default class Request {
	private static parseQueryParams(params?: QueryParams) {
		if (!params || !Object.keys(params).length) {
			return "";
		}

		// Parse { key: value } to `&key=value` strings pairs and combine them
		const queries = Object.entries(params)
			.map(([key, val]) => `${key}=${val}`)
			.join("&");

		return `?${queries}`;
	}

	public static async query<T>(args: Args) {
		const queries = Request.parseQueryParams(args.params);
		let data: T | null = null;
		let code: number = 200;

		try {
			const response = await fetch(`${args.url}${queries}`, {
				method: args.method,
				body: JSON.stringify(args.body),
				headers: { "Content-Type": "application/json", ...args.headers },
			});

			code = response.status;

			if (args.withResponse) data = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			return { data, code };
		}
	}

	public static async tag<T>(args: Args) {
		args.url = `${SERVER_URL}/api/tags/${args.url}`;
		return await Request.query<T>({ ...args });
	}

	public static async comment<T>(args: Args) {
		args.url = `${SERVER_URL}/api/comments/${args.url}`;
		return await Request.query<T>({ ...args, withResponse: true });
	}

	public static async post<T>(args: Args) {
		args.url = `${SERVER_URL}/api/posts/${args.url}`;
		return await Request.query<T>({ ...args, withResponse: true });
	}

	public static async auth<T>(args: Args) {
		args.url = `${SERVER_URL}/api/users/${args.url}`;
		return await Request.query<T>({ ...args, withResponse: true });
	}
}
