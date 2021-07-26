import { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";

export function Filter() {
	return <Wrapper>Filter</Wrapper>;
}

const Wrapper = styled.div`
	position: sticky;
	z-index: 10;
	top: 5rem; /* Navbar height */
`;
