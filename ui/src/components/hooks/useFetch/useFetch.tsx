import { isEqual } from "lodash";
import { useState, useEffect } from "react";
import { Args, Options, Status, QueryParams } from "./types";

export function parseQueryParams(params?: QueryParams) {
	if (!params || !Object.keys(params).length) {
		return "";
	}

	// Parse { key: value } to `&key=value` strings pairs and combine them
	const queries = Object.entries(params)
		.map(([key, val]) => `${key}=${val}`)
		.join("&");

	return `?${queries}`;
}

export default function useFetch<Data>(url: string, args?: Args, callback?: (data: Data) => void) {
	const [data, setData] = useState<Data>();
	const [status, setStatus] = useState<Status>("loading");
	const [memoArgs, setMemoArgs] = useState<Args>();

	// This is to avoid infinite loops as args contains nested objects
	useEffect(() => {
		if (!isEqual(memoArgs, args)) {
			setMemoArgs(args);
		}
	}, [args, memoArgs]);

	useEffect(() => {
		const abortController: AbortController = new AbortController();

		(async () => {
			const method = memoArgs?.method ?? "GET";
			try {
				const options: Options = {
					method,
					body: memoArgs?.body,
					headers: memoArgs?.headers,
					signal: abortController.signal,
				};

				const response: Response = await fetch(
					`${url}${parseQueryParams(memoArgs?.params)}`,
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
	}, [url, callback, memoArgs]);

	return {
		data,
		status,
		isLoading: status === "loading",
		isError: status === "error",
		isSuccess: status === "success",
	};
}
