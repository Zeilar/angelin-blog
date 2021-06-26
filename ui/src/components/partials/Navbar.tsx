import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { useAuth, useAuthModals } from "../contexts";
import { header, ButtonSecondary, Row } from "../styled-components";
import Modals from "./modals/Modals";

export function Navbar() {
	const { loggedIn, loading, logout, user } = useAuth();
	const { openModal } = useAuthModals();

	return (
		<Wrapper>
			<Nav>
				<List as="ul">
					<Item>
						<Link to="/">Home</Link>
					</Item>
					{!loading && !loggedIn && (
						<>
							<Item>
								<ButtonSecondary onClick={() => openModal("login")}>
									Login
								</ButtonSecondary>
							</Item>
							<Item>
								<ButtonSecondary onClick={() => openModal("register")}>
									Register
								</ButtonSecondary>
							</Item>
						</>
					)}
					{!loading && loggedIn && (
						<>
							<Item>
								<ButtonSecondary onClick={logout}>Logout</ButtonSecondary>
							</Item>
							{user?.is_admin && (
								<Item>
									<Link to="/post/new">Create post</Link>
								</Item>
							)}
						</>
					)}
				</List>
			</Nav>
			<Modals />
		</Wrapper>
	);
}

const Wrapper = styled.header`
	background-color: rgb(${theme.color.secondary});
	border-bottom: 2px solid rgb(${theme.color.primary});
`;

const Nav = styled.nav``;

const List = styled(Row)``;

const Item = styled.li`
	display: flex;
	padding: 15px 0;
`;

const link = css`
	${header}
	padding: 10px;
`;

const Link = styled(NavLink)`
	${link}
`;
