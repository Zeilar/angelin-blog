import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { useAuth, useAuthModals } from "../contexts";
import { header, ButtonSmall, Row } from "../styled-components";
import Modals from "./modals/Modals";

export default function Navbar() {
	const { loggedIn, loading, logout } = useAuth();
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
								<ButtonSmall onClick={() => openModal("login")}>Login</ButtonSmall>
							</Item>
							<Item>
								<ButtonSmall onClick={() => openModal("register")}>
									Register
								</ButtonSmall>
							</Item>
						</>
					)}
					{!loading && loggedIn && (
						<Item>
							<ButtonSmall onClick={logout}>Logout</ButtonSmall>
						</Item>
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
	&:hover {
		/* background-color: rgba(${theme.color.primary}, 0.75); */
	}
`;

const Link = styled(NavLink)`
	${link}
`;
