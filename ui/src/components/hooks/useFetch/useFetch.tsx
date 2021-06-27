import { isEqual } from "lodash";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { FetchContext } from "./FetchProvider";
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

export function useFetch<T>(url: string, args?: Args, callback?: (data: T) => void) {
	const [data, setData] = useState<T>();
	const [status, setStatus] = useState<Status>("loading");
	const [memoArgs, setMemoArgs] = useState<Args>();

	const fetchContext = useContext(FetchContext);

	// This is to avoid infinite loops in the useEffect as args contains nested objects
	useEffect(() => {
		if (!isEqual(memoArgs, args)) {
			setMemoArgs(args);
		}
	}, [args, memoArgs]);

	useEffect(() => {
		const abortController: AbortController = new AbortController();

		(async () => {
			if (!fetchContext) return;

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

				const response: Response = await fetch(fullUrl, options);

				if (!response.ok)
					throw new Error(
						`Failed to ${method} ${url} ${response.status} ${response.statusText}`
					);

				const data: T = await response.json();

				cachedData.set(fullUrl, data);

				setStatus("success");
				setData(data);

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
		isLoading: status === "loading",
		isError: status === "error",
		isSuccess: status === "success",
	};
}
