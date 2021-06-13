import { isEqual } from "lodash";
import { RefObject, useEffect, useRef, useState } from "react";

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

	const [memoArgs, setMemoArgs] = useState<Args>();
	const ref: RefObject<T> = useRef<T>(null);

	// This is to avoid infinite loops in the useEffect as args contains nested objects
	useEffect(() => {
		if (!isEqual(memoArgs, args)) {
			setMemoArgs(args);
		}
	}, [args, memoArgs]);

	useEffect(() => {
		const element = ref.current;
		const event = memoArgs?.mouseup ? "mouseup" : "mousedown";

		function clickHandler(e: MouseEvent): void {
			try {
				if (!element) throw new Error("Ref must be assigned to an element.");
				if (memoArgs?.condition === false) return;
				if (!element.contains(e.target as Node)) callback(element);
			} catch (error) {
				console.error(error);
				if (memoArgs?.onError) memoArgs.onError(error);
			}
		}

		document.addEventListener(event, clickHandler);

		return () => {
			document.removeEventListener(event, clickHandler);
		};
	}, [callback, memoArgs]);

	return ref;
}
