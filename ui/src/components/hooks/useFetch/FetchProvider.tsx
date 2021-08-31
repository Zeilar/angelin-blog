import { createContext, ReactNode, useRef, useContext } from "react";

interface Props {
	children: ReactNode;
}

export interface IFetchContext {
	cache: Map<string, any>;
	clearCache: (...keys: string[]) => void;
}

export const FetchContext = createContext<IFetchContext>({} as IFetchContext);

export function useFetchContext() {
	return useContext(FetchContext);
}

export function FetchContextProvider({ children }: Props) {
	let cache = useRef(new Map<string, any>()).current;

	function clearCache(...keys: string[]) {
		if (keys?.length <= 0) {
			cache = new Map<string, any>();
			return;
		}

		keys.forEach(key => {
			cache.delete(key);
		});
	}

	const values: IFetchContext = {
		cache,
		clearCache,
	};

	return <FetchContext.Provider value={values}>{children}</FetchContext.Provider>;
}
