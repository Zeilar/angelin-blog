import { useContext } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { Row } from "../styled-components/layout";
import { header } from "../styled-components/typography";
import Modals, { Modal } from "./modals/Modals";

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
			<Modals active={activeModal} closeAll={closeModals} open={openModal} />
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
