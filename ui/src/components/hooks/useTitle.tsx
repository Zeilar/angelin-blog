import { useEffect, useRef } from "react";

export default function useTitle(title: string, f?: string) {
	const fallback = useRef(f);

	function setTitle(title: string) {
		document.title = title;
	}

	useEffect(() => {
		setTitle(title);
		const fallbackTitle = fallback.current;
		return () => {
			if (fallbackTitle) {
				setTitle(fallbackTitle);
			}
		};
	}, [title]);

	return { title, setTitle };
}
