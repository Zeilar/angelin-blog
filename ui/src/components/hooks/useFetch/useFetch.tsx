import { isEqual } from "lodash";
import { useState, useEffect } from "react";
import { useFetchContext } from "./FetchProvider";
import { Args, Options, Status } from "./types";

export function parseQueryParams(params?: { [key: string]: string }) {
	if (!params || !Object.keys(params).length) {
		return "";
	}

	// Parse { key: value } to `&key=value` strings pairs and combine them
	const queries = Object.entries(params)
		.map(([key, val]) => `${key}=${val}`)
		.join("&");

	return `?${queries}`;
}

export function useFetch<T>(url: string, args?: Args, callback?: (data: T) => void) {
	const [data, setData] = useState<T | null>(null);
	const [status, setStatus] = useState<Status | null>(null);
	const [code, setCode] = useState<number>(200);
	const [memoArgs, setMemoArgs] = useState<Args>();

	const fetchContext = useFetchContext();

	// This is to avoid infinite loops in the useEffect as args contains nested objects
	useEffect(() => {
		if (!isEqual(memoArgs, args)) {
			setMemoArgs(args);
		}
	}, [args, memoArgs]);

	useEffect(() => {
		const abortController = new AbortController();

		(async () => {
			const fullUrl = `${url}${parseQueryParams(memoArgs?.params)}`,
				cachedData = fetchContext.cached,
				cached = cachedData.get(fullUrl),
				method = memoArgs?.method ?? "GET";

			if (cached) {
				setData(cached);
				setStatus("success");
				return;
			}

			try {
				const options: Options = {
					method,
					body: memoArgs?.body,
					headers: memoArgs?.headers,
					signal: abortController.signal,
				};

				setStatus("loading");

				const response = await fetch(fullUrl, options);

				setCode(response.status);

				if (!response.ok)
					throw new Error(
						`Failed to ${method} ${url} ${response.status} ${response.statusText}`
					);

				const data = await response.json();

				cachedData.set(fullUrl, data);

				setData(data);
				setStatus("success");

				if (callback) callback(data);
			} catch (error) {
				console.error(error);
				if (!(error instanceof DOMException)) {
					setStatus("error");
				}
			}
		})();

		return () => {
			abortController.abort();
		};
	}, [url, callback, memoArgs, fetchContext]);

	return {
		body: data,
		status,
		code,
		isLoading: status === "loading",
		isError: status === "error",
		isSuccess: status === "success",
	};
}
