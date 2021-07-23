import { useMemo } from "react";
import { createContext, useState, ReactNode, Dispatch } from "react";
import { ThemeProvider } from "styled-components";
import { Theme } from "../../styles/theme";

interface Props {
	children: ReactNode;
}

type ThemeScheme = "light" | "dark";

interface Context {
	themeScheme: ThemeScheme;
	setThemeScheme: Dispatch<React.SetStateAction<ThemeScheme>>;
}

export const ThemeContext = createContext<Context | null>(null);

export function ThemeContextProvider({ children }: Props) {
	const [themeScheme, setThemeScheme] = useState<ThemeScheme>("light");
	const theme = useMemo(() => new Theme(themeScheme), [themeScheme]);

	const values: Context = { themeScheme, setThemeScheme };

	return (
		<ThemeProvider theme={theme}>
			<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
		</ThemeProvider>
	);
}
