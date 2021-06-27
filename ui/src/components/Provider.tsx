import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/GlobalStyles";
import { theme } from "../styles/theme";
import { AuthModalContextProvider, UserContextProvider } from "./contexts";
import { FetchContextProvider } from "./hooks/useFetch/FetchProvider";

interface Props {
	children: ReactNode;
}

export default function Provider({ children }: Props) {
	return (
		<ThemeProvider theme={theme}>
			<FetchContextProvider>
				<UserContextProvider>
					<AuthModalContextProvider>
						<GlobalStyles />
						{children}
					</AuthModalContextProvider>
				</UserContextProvider>
			</FetchContextProvider>
		</ThemeProvider>
	);
}
