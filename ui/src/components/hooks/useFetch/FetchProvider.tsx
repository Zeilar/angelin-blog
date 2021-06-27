import { createContext, ReactNode, useRef } from "react";

export const FetchContext = createContext<Context | null>(null);

interface Props {
	children: ReactNode;
}

interface Context {
	cached: Map<string, any>;
}

export function FetchContextProvider({ children }: Props) {
	const cached = useRef(new Map<string, any>()).current;

	const values: Context = {
		cached,
	};

	return <FetchContext.Provider value={values}>{children}</FetchContext.Provider>;
}
