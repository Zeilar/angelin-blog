import { useMemo } from "react";
import { createContext, useState, ReactNode, Dispatch } from "react";
import { ThemeProvider } from "styled-components";
import { Theme } from "../../styles/theme";

interface Props {
	children: ReactNode;
}

type ThemeScheme = "light" | "dark";

export interface IThemeContext {
	themeScheme: ThemeScheme;
	setThemeScheme: Dispatch<React.SetStateAction<ThemeScheme>>;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

export function ThemeContextProvider({ children }: Props) {
	const [themeScheme, setThemeScheme] = useState<ThemeScheme>(
		window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
	);
	const theme = useMemo(() => new Theme(themeScheme), [themeScheme]);

	const values: IThemeContext = { themeScheme, setThemeScheme };

	return (
		<ThemeProvider theme={theme}>
			<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
		</ThemeProvider>
	);
}
