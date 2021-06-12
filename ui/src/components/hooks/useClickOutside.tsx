import { RefObject, useEffect, useRef } from "react";

interface Args {
	condition?: boolean;
	mouseup?: boolean;
	onError?: (error: Error) => void;
}

export default function useClickOutside<T extends HTMLElement>(
	callback: (element?: T) => void,
	args?: Args
) {
	if (!callback) throw new Error(`Expected callback function, got ${JSON.stringify(callback)}`);

	const ref: RefObject<T> = useRef<T>(null);

	useEffect(() => {
		const element = ref.current;
		const event = args?.mouseup ? "mouseup" : "mousedown";

		function clickHandler(e: MouseEvent): void {
			try {
				if (!element) throw new Error("Ref must be assigned to an element.");
				if (args?.condition === false) return;
				if (!element.contains(e.target as Node)) callback(element);
			} catch (error) {
				console.error(error);
				if (args?.onError) args.onError(error);
			}
		}

		document.addEventListener(event, clickHandler);

		return () => {
			document.removeEventListener(event, clickHandler);
		};
	}, [callback, args?.condition, args?.mouseup, args?.onError]);

	return ref;
}
