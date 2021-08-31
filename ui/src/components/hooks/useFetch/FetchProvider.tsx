import { createContext, ReactNode, useRef, useContext } from "react";

interface Props {
	children: ReactNode;
}

export interface IFetchContext {
	cached: Map<string, any>;
	clearCache: (...keys: string[]) => void;
}

export const FetchContext = createContext<IFetchContext>({} as IFetchContext);

export function useFetchContext() {
	return useContext(FetchContext);
}

export function FetchContextProvider({ children }: Props) {
	let cached = useRef(new Map<string, any>()).current;

	function clearCache(...keys: string[]) {
		if (keys?.length <= 0) {
			cached = new Map<string, any>();
			return;
		}

		keys.forEach(key => {
			if (cached.has(key)) {
				cached.delete(key);
			}
		});
	}

	const values: IFetchContext = {
		cached,
		clearCache,
	};

	return <FetchContext.Provider value={values}>{children}</FetchContext.Provider>;
}
