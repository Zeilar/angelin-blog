import { useContext } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { IUserContext, UserContext } from "../contexts";
import * as Styles from "../styled-components";
import { Login, Register } from "./modals";
import { Modal } from "./modals/Modal";

export function Navbar() {
	const { loggedIn, loading, logout, user } = useContext(UserContext) as IUserContext;

	const [loginModalOpen, setLoginModalOpen] = useState(false);
	const [registerModalOpen, setRegisterModalOpen] = useState(false);

	function openLogin() {
		setRegisterModalOpen(false);
		setLoginModalOpen(true);
	}

	function openRegister() {
		setLoginModalOpen(false);
		setRegisterModalOpen(true);
	}

	function renderAuthNav() {
		if (loading) return null;

		if (loggedIn) {
			return (
				<Item>
					<ModalButton className="mr-0" onClick={logout}>
						Logout
					</ModalButton>
				</Item>
			);
		} else {
			return (
				<>
					<Item className="mr-6">
						<ModalButton onClick={() => setLoginModalOpen(true)}>Login</ModalButton>
					</Item>
					<Item>
						<Styles.PrimaryButton
							className="small"
							onClick={() => setRegisterModalOpen(true)}
						>
							Register
						</Styles.PrimaryButton>
					</Item>
				</>
			);
		}
	}

	return (
		<Wrapper as="header" align="center">
			<Styles.Container as="nav">
				<Styles.Row as="ul">
					<Item className="mr-6">
						<Link to="/" exact>
							Home
						</Link>
					</Item>
					{!loading && user?.is_admin && (
						<Item>
							<Link to="/post/new" exact>
								Create Post
							</Link>
						</Item>
					)}
					<Styles.Row className="ml-auto">{renderAuthNav()}</Styles.Row>
				</Styles.Row>
			</Styles.Container>
			<Modal
				altOpen={loginModalOpen}
				altSetOpen={setLoginModalOpen}
				onEscape={() => setLoginModalOpen(false)}
				render={(open, setOpen) => (
					<Login open={open} setOpen={setOpen} openRegister={openRegister} />
				)}
			/>
			<Modal
				altOpen={registerModalOpen}
				altSetOpen={setRegisterModalOpen}
				onEscape={() => setRegisterModalOpen(false)}
				render={(open, setOpen) => (
					<Register open={open} setOpen={setOpen} openLogin={openLogin} />
				)}
			/>
		</Wrapper>
	);
}

const Wrapper = styled(Styles.Row)`
	height: 5rem;
	position: sticky;
	top: 0;
	z-index: 100;
	${props => css`
		background-color: hsl(${props.theme.color.get("primary")});
		border-bottom: 1px solid hsl(${props.theme.color.get("secondary")});
	`}
`;

const Item = styled.li.attrs({ align: "center" })`
	${Styles.flexbox}
`;

const link = css`
	${Styles.header}
	position: relative;
	user-select: none;
	cursor: pointer;
	height: 5rem;
	font-size: 1.25rem;
	position: relative;
	display: flex;
	align-items: center;
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		&.active {
			&::after {
				content: "";
				position: absolute;
				width: 100%;
				height: 1px;
				bottom: 0;
				left: 0;
				background-color: hsl(${props.theme.color.get("brand")});
			}
		}
		&:hover,
		&.active {
			color: hsl(${props.theme.color.get("brand")});
		}
	`}
`;

const Link = styled(NavLink)`
	${link}
`;

const ModalButton = styled(Styles.Span)`
	${link}
`;
