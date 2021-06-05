import { useContext } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { Row, phone } from "../styled-components/layout";
import { header } from "../styled-components/typography";

type Modal = "login" | "register" | null;

export default function Navbar() {
	const context = useContext(UserContext);
	if (!context) throw new Error("Context must not be null");

	const [activeModal, setActiveModal] = useState<Modal>(null);

	function closeModals() {
		setActiveModal(null);
	}

	function openModal(modal: Modal) {
		setActiveModal(modal);
	}

	useEffect(() => {}, []);

	return (
		<Wrapper>
			<Nav>
				<List as="ul">
					<Item>
						<Link to="/">Home</Link>
					</Item>
					<Item>
						<ModalLink onClick={() => openModal("login")}>Login</ModalLink>
					</Item>
					<Item>
						<ModalLink onClick={() => openModal("register")}>Register</ModalLink>
					</Item>
				</List>
			</Nav>
		</Wrapper>
	);
}

const Wrapper = styled.header``;

const Nav = styled.nav``;

const List = styled(Row)``;

const Item = styled.li``;

const link = css`
	${header}
`;

const Link = styled(NavLink)`
	${link}
`;

const ModalLink = styled.a`
	${link}
`;
