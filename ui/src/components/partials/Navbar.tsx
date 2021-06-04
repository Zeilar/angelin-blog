import { useState, useEffect, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { header } from "../styles/typography";

export default function Navbar(): JSX.Element {
	return (
		<Wrapper>
			<Nav>
				<List>
					<Item>
						<Link to="/">Home</Link>
					</Item>
				</List>
			</Nav>
		</Wrapper>
	);
}

const Wrapper = styled.header``;

const Nav = styled.nav``;

const List = styled.ul``;

const Item = styled.li``;

const Link = styled(NavLink)`
	${header}
`;
