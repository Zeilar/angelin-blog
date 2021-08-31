import { useEffect, useRef } from "react";

export function useTitle(input: string | (() => string), f?: string) {
	const fallback = useRef(f).current;

	function setTitle(title: string) {
		document.title = title;
	}

	useEffect(() => {
		setTitle(typeof input === "function" ? input() : input);
		return () => {
			if (fallback) setTitle(fallback);
		};
	}, [input, fallback]);
}
