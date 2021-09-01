import { isEqual } from "lodash";
import { useState, useEffect, useRef } from "react";
import { useFetchContext } from "./FetchProvider";
import { Args, Options, Status } from "./types";

export function parseQueryParams(params?: Record<string, string>) {
	if (!params || Object.keys(params).length <= 0) {
		return "";
	}

	// Parse { key: value } to `&key=value` string pairs and combine them
	const queries = Object.entries(params)
		.map(([key, val]) => `${key}=${val}`)
		.join("&");

	return `?${queries}`;
}

export function useFetch<T>(url: string, args?: Args, callback?: (data: T) => void) {
	const [data, setData] = useState<T | null>(null);
	const [status, setStatus] = useState<Status | null>(null);
	const [code, setCode] = useState<number>(200);
	const [memoArgs, setMemoArgs] = useState<Args | undefined>(args);
	const abortController = useRef(new AbortController()).current;
	const { cache } = useFetchContext();

	// This is to avoid infinite loops in the useEffect dependencies
	// Due to args containing nested objects
	useEffect(() => {
		if (!isEqual(memoArgs, args)) {
			setMemoArgs(args);
		}
	}, [args, memoArgs]);

	useEffect(() => {
		// const abortController = new AbortController();

		// TODO: make "isOld" function to clear cache automatically if it's old enough

		(async () => {
			const fullUrl = `${url}${parseQueryParams(memoArgs?.params)}`,
				cached = cache.get(fullUrl),
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

				if (!response.ok) {
					throw new Error(`${method} ${url} ${response.status} ${response.statusText}`);
				}

				const data = await response.json();

				cache.set(fullUrl, data);

				setData(data);
				setStatus("success");

				if (callback) callback(data);
			} catch (error) {
				console.error(error);
				setStatus("error");
			}
		})();
	}, [url, callback, memoArgs, cache, abortController.signal]);

	useEffect(() => {
		return () => {
			abortController.abort();
		};
	}, [abortController]);

	return {
		body: data,
		status,
		code,
		isLoading: status === "loading",
		isError: status === "error",
		isSuccess: status === "success",
	};
}
