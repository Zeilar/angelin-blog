import { createContext, ReactNode, useRef } from "react";

export const FetchContext = createContext<Context | null>(null);

interface Props {
	children: ReactNode;
}

interface Context {
	cached: Map<string, any>;
	clearCache: (key: string) => void;
}

export function FetchContextProvider({ children }: Props) {
	let cached = useRef(new Map<string, any>()).current;

	function clearCache(): void;
	function clearCache(key?: string): void {
		if (typeof key !== "string") {
			cached = new Map<string, any>();
			return;
		}

		if (cached.has(key)) {
			cached.delete(key);
		}
	}

	const values: Context = {
		cached,
		clearCache,
	};

	return <FetchContext.Provider value={values}>{children}</FetchContext.Provider>;
}
