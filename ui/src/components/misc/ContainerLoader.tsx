import { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";

interface Props {
	loading: boolean;
}

export default function ContainerLoader({ loading = false }: Props) {
	return (
		<Container className={classNames({ active: loading })}>
			<Loader path={mdiLoading} spin={1} size={2} />
		</Container>
	);
}

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
	display: none;
	&.active {
		display: block;
		background-color: rgba(0, 0, 0, 0.25);
		backdrop-filter: saturate(100%) blur(3px);
	}
`;

const Loader = styled(Icon)`
	position: absolute;
	transform: translate(-50%, -50%);
	left: 50%;
	top: 50%;
`;
