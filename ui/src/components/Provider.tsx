import { ReactNode } from "react";
import { GlobalStyles } from "../styles/GlobalStyles";
import { AuthModalContextProvider, ThemeContextProvider, UserContextProvider } from "./contexts";
import { FetchContextProvider } from "./hooks/useFetch";

interface Props {
	children: ReactNode;
}

export default function Provider({ children }: Props) {
	return (
		<ThemeContextProvider>
			<FetchContextProvider>
				<UserContextProvider>
					<AuthModalContextProvider>
						{children}
						<GlobalStyles />
					</AuthModalContextProvider>
				</UserContextProvider>
			</FetchContextProvider>
		</ThemeContextProvider>
	);
}
