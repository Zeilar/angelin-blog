import { RefObject, useEffect, useRef } from "react";

interface Args {
	condition?: boolean;
	mousedown?: boolean;
	onError?: (error: Error) => void;
}

export default function useClickOutside<T extends HTMLElement>(
	callback: () => void,
	args: Args = {}
): RefObject<T> {
	if (!callback) throw new Error(`Expected callback function, got ${JSON.stringify(callback)}`);

	const ref: RefObject<T> = useRef<T>(null);

	useEffect(() => {
		// Some of these variables may feel like bloat, but they help the useEffect dependencies and make the code more readable
		const element = ref.current;
		const event = args.mousedown ? "mousedown" : "mouseup";
		const condition = args.condition ?? true;
		const onError = args.onError;

		function clickHandler(e: MouseEvent): void {
			try {
				if (!element) throw new Error("Ref must be assigned to an element.");
				if (!condition) return;
				if (!element.contains(e.target as Node)) callback();
			} catch (error) {
				console.error(error);
				if (onError) onError(error);
			}
		}

		document.addEventListener(event, clickHandler);

		return () => {
			document.removeEventListener(event, clickHandler);
		};
	}, [callback, args.condition, args.mousedown, args.onError]);

	return ref;
}
