import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAuth } from "../contexts";
import * as Styles from "../styled-components";
import { Login, Register } from "./modals";
import { Modal } from "./modals/Modal";

export function Navbar() {
	const { loggedIn, loading, logout, user } = useAuth();

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
					<Item className="mr-8">
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
			<Nav as="nav">
				<Styles.Row as="ul">
					<Item className="mr-8">
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
			</Nav>
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
	${props => css`
		background-color: hsl(${props.theme.color.get("primary")});
		box-shadow: ${props.theme.shadow.pick("elevateUnder")};
	`}
	height: 4rem;
	position: sticky;
	top: 0;
	z-index: 100;
`;

const Nav = styled(Styles.Container)`
	backdrop-filter: blur(10px);
`;

const Item = styled.li.attrs({ align: "center" })`
	${Styles.flexbox}
`;

const link = css`
	${Styles.header}
	position: relative;
	user-select: none;
	cursor: pointer;
	transition: 0.05s;
	${props => css`
		border-radius: ${props.theme.borderRadius}px;
		&:hover {
			color: hsl(${props.theme.color.get("brand")});
		}
		&:active {
			color: hsl(${props.theme.color.pick("brand").darken().get()});
		}
	`}
`;

const Link = styled(NavLink)`
	${link}
`;

const ModalButton = styled(Styles.Span)`
	${link}
`;
