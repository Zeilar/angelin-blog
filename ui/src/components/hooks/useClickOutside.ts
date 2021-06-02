import { useEffect, useRef } from "react";

interface Args {
	condition?: boolean;
	mousedown?: boolean;
}

export default function useClickOutside<T extends HTMLElement>(
	callback: Function,
	args: Args = {}
) {
	const ref = useRef<T>(null);

	useEffect(() => {
		const event: "mousedown" | "mouseup" = args.mousedown ? "mousedown" : "mouseup";

		function clickHandler(e: MouseEvent): void {
			if (!ref.current || !args.condition) return;

			if (!ref.current.contains(e.target as Node)) {
				callback();
			}
		}

		document.addEventListener(event, clickHandler);

		return () => {
			document.removeEventListener(event, clickHandler);
		};
	}, [callback, args.condition, args.mousedown]);

	return ref;
}
