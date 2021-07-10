import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
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
					<Item className="mr-2">
						<ModalButton onClick={() => setLoginModalOpen(true)}>Login</ModalButton>
					</Item>
					<Item>
						<ModalButton onClick={() => setRegisterModalOpen(true)}>
							Register
						</ModalButton>
					</Item>
				</>
			);
		}
	}

	return (
		<Wrapper>
			<Styles.Container as="nav">
				<Styles.Row className="py-2" as="ul">
					<Item className="mr-2">
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

const Wrapper = styled.header`
	background-color: rgb(${theme.color.secondary});
	box-shadow: ${theme.shadow.elevateUnder};
	z-index: 100;
`;

const Item = styled.li.attrs({ align: "center" })`
	${Styles.flexbox}
	font-size: 1.25rem;
`;

const link = css`
	${Styles.header}
	user-select: none;
	border-radius: ${theme.borderRadius}px;
	padding: 0.5rem;
	transition: 0.05s;
	&:hover {
		background-color: rgb(${theme.color.brand});
	}
	&:active {
		background-color: rgba(${theme.color.brand}, 0.75);
	}
`;

const ModalButton = styled.a`
	${link}
`;

const Link = styled(NavLink)`
	${link}
`;
