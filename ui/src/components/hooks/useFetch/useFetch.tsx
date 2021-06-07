import { useState, useEffect } from "react";
import { Args, Options, Status, QueryParams } from "./types";

export function parseQueryParams(params?: QueryParams): string {
	if (!params || !Object.keys(params).length) {
		return "";
	}

	// Parse { key: value } to `key=value` strings
	const queries = Object.entries(params)
		.map(([key, val]) => `${key}=${val}`)
		.join("&");

	return `?${queries}`;
}

export default function useFetch<Data>(url: string, args?: Args, callback?: (data: Data) => void) {
	const [data, setData] = useState<Data>();
	const [status, setStatus] = useState<Status>("loading");

	useEffect(() => {
		const abortController: AbortController = new AbortController();

		(async () => {
			const method = args?.method ?? "GET";
			try {
				const options: Options = {
					method,
					body: args?.body,
					headers: args?.headers,
					signal: abortController.signal,
				};

				const response: Response = await fetch(
					`${url}${parseQueryParams(args?.params)}`,
					options
				);

				if (!response.ok)
					throw new Error(
						`Failed to ${method} ${url} ${response.status} ${response.statusText}`
					);

				const data: Data = await response.json();

				if (callback) callback(data);

				setStatus("success");
				setData(data);
			} catch (error) {
				console.error(error);
				if (!(error instanceof DOMException)) {
					setStatus("error");
				}
			}
		})();

		return (): void => {
			abortController.abort();
		};
	}, [url, callback, args?.body, args?.method]); // Since args.params and args.headers are objects, they will cause an infinite loop if they are included.

	return {
		data,
		status,
		isLoading: status === "loading",
		isError: status === "error",
		isSuccess: status === "success",
	};
}
