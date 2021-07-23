import { useContext } from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../contexts";
import { mdiLightbulbOutline, mdiLightbulb } from "@mdi/js";
import Icon from "@mdi/react";

export default function ThemeToggler() {
	const theme = useContext(ThemeContext);

	function toggleTheme() {
		const element = document.querySelector("html") as HTMLHtmlElement; // If this doesn't exist then who knows
		element.classList.add("transition");
		theme?.setThemeScheme(p => (p === "dark" ? "light" : "dark"));
		setTimeout(() => {
			element.classList.remove("transition");
		}, 500); // Should match the overriding transition timer
	}

	return (
		<button
			onClick={toggleTheme}
			title={`Switch to ${theme?.themeScheme === "dark" ? "light" : "dark"} theme`}
		>
			{theme?.themeScheme === "light" ? (
				<IconOn path={mdiLightbulb} />
			) : (
				<IconOff path={mdiLightbulbOutline} />
			)}
		</button>
	);
}

const ThemeIcon = styled(Icon)`
	position: fixed;
	transform: translateY(-50%);
	top: 50%;
	right: 1rem;
	width: 2rem;
	height: 2rem;
`;

const IconOn = styled(ThemeIcon)`
	${props => css`
		color: hsl(${props.theme.color.get("brand")});
	`}
`;

const IconOff = styled(ThemeIcon)`
	${props => css`
		color: hsl(${props.theme.color.get("text")});
	`}
`;
