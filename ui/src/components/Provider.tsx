import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/globalStyles";
import { theme } from "../styles/theme";
import { AuthModalContextProvider } from "./contexts/AuthModalContext";
import { UserContextProvider } from "./contexts/UserContext";

interface Props {
	children: ReactNode;
}

export default function Provider({ children }: Props) {
	return (
		<ThemeProvider theme={theme}>
			<UserContextProvider>
				<AuthModalContextProvider>
					<GlobalStyles />
					{children}
				</AuthModalContextProvider>
			</UserContextProvider>
		</ThemeProvider>
	);
}
