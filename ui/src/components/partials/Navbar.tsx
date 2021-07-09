import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { useAuth, useAuthModals } from "../contexts";
import * as Styles from "../styled-components";
import Modals from "./modals/Modals";

export function Navbar() {
	const { loggedIn, loading, logout, user } = useAuth();
	const { openModal } = useAuthModals();

	function renderAuthNav() {
		if (loading) return null;

		if (loggedIn) {
			return (
				<Item>
					<ModalButton onClick={logout}>Logout</ModalButton>
				</Item>
			);
		} else {
			return (
				<>
					<Item>
						<ModalButton onClick={() => openModal("login")}>Login</ModalButton>
					</Item>
					<Item>
						<ModalButton className="ml-2" onClick={() => openModal("register")}>
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
					<Item>
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
			<Modals />
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
	margin-right: 1rem;
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
