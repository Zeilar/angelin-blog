import { Args, QueryParams, Body } from "../types/request";
import { URLHelpers } from "./";

export class Request {
	public static parseQueryParams(params?: QueryParams) {
		if (!params || !Object.keys(params).length) {
			return "";
		}

		// Parse { key: value } to `&key=value` strings pairs and combine them
		const parsed = Object.entries(params)
			.map(([key, val]) => `${key}=${val}`)
			.join("&");

		return `?${parsed}`;
	}

	public static async query<T>(args: Args) {
		const params = Request.parseQueryParams(args.params);

		let data: Body<T> | null = null,
			code = 200,
			ok = true;

		try {
			const response = await fetch(`${args.url}${params}`, {
				method: args.method,
				body: JSON.stringify(args.body),
				credentials: "include",
				headers: { "Content-Type": "application/json", ...args.headers },
			});

			if (
				args.withResponse &&
				response.headers.get("Content-Type")?.includes("application/json")
			) {
				data = await response.json();
			}

			ok = response.ok;
			code = response.status;
		} catch (error) {
			console.error(error);
		} finally {
			return { data: data?.data, error: data?.error, code, ok };
		}
	}

	public static async tag<T>(args: Args) {
		args.url = `${URLHelpers.apiTags()}/${args.url}`;
		return await Request.query<T>({ ...args });
	}

	public static async comment<T>(args: Args) {
		args.url = `${URLHelpers.apiComments()}/${args.url}`;
		return await Request.query<T>({ ...args, withResponse: true });
	}

	public static async post<T>(args: Args) {
		args.url = `${URLHelpers.apiPosts()}/${args.url}`;
		return await Request.query<T>({ ...args, withResponse: true });
	}

	public static async auth<T>(args: Args) {
		args.url = `${URLHelpers.apiUsers()}/${args.url}`;
		return await Request.query<T>({ ...args, withResponse: true });
	}
}
