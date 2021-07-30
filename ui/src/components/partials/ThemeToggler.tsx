import { useContext } from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../contexts";
import { mdiLightbulbOutline, mdiLightbulbOn } from "@mdi/js";
import Icon from "@mdi/react";

export function ThemeToggler() {
	const theme = useContext(ThemeContext);

	function toggleTheme() {
		theme?.setThemeScheme(p => (p === "dark" ? "light" : "dark"));
	}

	return (
		<Wrapper
			onClick={toggleTheme}
			title={`Switch to ${theme?.themeScheme === "dark" ? "light" : "dark"} theme`}
		>
			{theme?.themeScheme === "light" ? (
				<IconOn path={mdiLightbulbOn} />
			) : (
				<IconOff path={mdiLightbulbOutline} />
			)}
		</Wrapper>
	);
}

const Wrapper = styled.button`
	position: fixed;
	transform: translateY(-50%);
	top: 50%;
	right: 1rem;
	width: 2rem;
	height: 2rem;
`;

const IconOn = styled(Icon)`
	${props => css`
		color: hsl(${props.theme.color.get("brand")});
	`}
`;

const IconOff = styled(Icon)`
	${props => css`
		color: hsl(${props.theme.color.get("text")});
	`}
`;
