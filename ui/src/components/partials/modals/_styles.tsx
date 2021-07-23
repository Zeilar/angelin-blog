import styled, { css } from "styled-components";
import * as Styles from "../../styled-components";
import Icon from "@mdi/react";
import { mdiClose, mdiGithub } from "@mdi/js";

export const Background = styled.div`
	position: fixed;
	overflow: hidden;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	transition: 0.5s;
	pointer-events: none;
	z-index: 1000;
	&.open {
		backdrop-filter: blur(10px);
		pointer-events: all;
		background-color: rgba(0, 0, 0, 0.65);
	}
`;

export const Wrapper = styled(Styles.Col)`
	position: absolute;
	transform: translate(-50%, -50%) scale(0.5);
	left: 50%;
	top: 50%;
	min-width: 500px;
	pointer-events: none;
	opacity: 0;
	transition: 0.25s;
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		background-color: hsl(${props.theme.color.get("primary")});
		box-shadow: ${props.theme.shadow.pick("spread")};
	`}
	&.open {
		pointer-events: all;
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
`;

export const CloseButton = styled.button.attrs({ type: "button" })`
	display: flex;
	background: none;
	border: 0;
	width: 2rem;
	height: 2rem;
	position: absolute;
	right: 0.5rem;
	top: 0.5rem;
	cursor: pointer;
	color: inherit;
	transition: 0.05s;
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		&:hover {
			color: hsl(${props.theme.color.get("brand")});
		}
	`}
	&:focus {
		outline: 0;
	}
`;

const LoginDividerLine = styled.div`
	height: 1px;
	width: 100%;
	${props => css`
		background-color: hsl(${props.theme.color.get("border")});
	`}
`;
const LoginDividerText = styled.span`
	user-select: none;
	margin: 0 1rem;
	${props => css`
		color: hsl(${props.theme.color.get("textMuted")});
	`}
`;
export function LoginDivider() {
	return (
		<Styles.Row className="my-6 justify-center items-center">
			<LoginDividerLine />
			<LoginDividerText>OR</LoginDividerText>
			<LoginDividerLine />
		</Styles.Row>
	);
}

const OAuthButton = styled(Styles.PrimaryButton).attrs({ type: "button" })`
	width: 100%;
`;
const OAuthIcon = styled(Icon)`
	margin-left: 0.5rem;
	width: 2rem;
	height: 2rem;
`;
export const GitHubButton = styled(OAuthButton)`
	background-color: hsl(0, 0%, 6%);
	color: hsl(0, 0%, 100%);
	&:hover {
		background-color: hsl(0, 0%, 12%);
	}
`;

type OAuthClick = React.MouseEventHandler<HTMLButtonElement> &
	React.MouseEventHandler<HTMLAnchorElement>;
export function GitHubLogin({ onClick }: { onClick: OAuthClick }) {
	return (
		<GitHubButton
			as="a"
			href={`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GITHUB_CALLBACK_URI}`}
			onClick={onClick}
		>
			<span>Login with GitHub</span>
			<OAuthIcon path={mdiGithub} />
		</GitHubButton>
	);
}

export function Close({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) {
	return (
		<CloseButton onClick={onClick}>
			<Icon path={mdiClose} />
		</CloseButton>
	);
}

export const Main = styled.form`
	display: flex;
	flex-direction: column;
	padding: 3rem;
`;

export const Footer = styled.div`
	padding: 3rem;
	${props => css`
		background-color: hsl(${props.theme.color.get("secondary")});
		box-shadow: ${props.theme.shadow.pick("spread")};
	`}
`;
