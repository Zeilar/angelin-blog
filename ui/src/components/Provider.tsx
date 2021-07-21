import { useState } from "react";
import { useMemo } from "react";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Theme } from "../styles/theme";
import { AuthModalContextProvider, UserContextProvider } from "./contexts";
import { FetchContextProvider } from "./hooks/useFetch";

interface Props {
	children: ReactNode;
}

export default function Provider({ children }: Props) {
	const [themeScheme, setThemeScheme] = useState<"dark" | "light">("dark");

	function toggleTheme() {
		setThemeScheme(p => (p === "dark" ? "light" : "dark"));
	}

	const theme = useMemo(() => {
		const themeObj = new Theme();
		themeObj.color.colors = themeObj.color[themeScheme];
		return themeObj;
	}, [themeScheme]);

	return (
		<ThemeProvider theme={theme}>
			<button onClick={toggleTheme}>Theme</button>
			<FetchContextProvider>
				<UserContextProvider>
					<AuthModalContextProvider>
						{children}
						<GlobalStyles />;
					</AuthModalContextProvider>
				</UserContextProvider>
			</FetchContextProvider>
		</ThemeProvider>
	);
}
