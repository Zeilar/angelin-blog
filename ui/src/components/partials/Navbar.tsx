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
					<Styles.ButtonSecondary onClick={logout}>Logout</Styles.ButtonSecondary>
				</Item>
			);
		} else {
			return (
				<>
					<Item>
						<Styles.ButtonSecondary onClick={() => openModal("login")}>
							Login
						</Styles.ButtonSecondary>
					</Item>
					<Item>
						<Styles.ButtonSecondary
							className="ml-2"
							onClick={() => openModal("register")}
						>
							Register
						</Styles.ButtonSecondary>
					</Item>
				</>
			);
		}
	}

	return (
		<Wrapper>
			<Nav as="nav">
				<List as="ul">
					<Item>
						<Link to="/">Home</Link>
					</Item>
					{!loading && user?.is_admin && (
						<Item>
							<Link to="/post/new">Create Post</Link>
						</Item>
					)}
					<Styles.Row className="ml-auto">{renderAuthNav()}</Styles.Row>
				</List>
			</Nav>
			<Modals />
		</Wrapper>
	);
}

const Wrapper = styled.header`
	background-color: rgb(${theme.color.secondary});
	box-shadow: ${theme.shadow.elevate};
	z-index: 100;
`;

const Nav = styled(Styles.Container)``;

const List = styled(Styles.Row)``;

const Item = styled.li`
	display: flex;
	align-items: center;
	padding: 1rem 0;
`;

const link = css`
	${Styles.header}
	padding: 0.5rem;
`;

const Link = styled(NavLink)`
	${link}
`;
