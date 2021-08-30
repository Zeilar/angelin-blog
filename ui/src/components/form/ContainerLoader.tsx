import styled from "styled-components";
import classNames from "classnames";
import { Loader } from "../sc";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	loading: boolean;
}

export function ContainerLoader({ loading = false, ...props }: Props) {
	return (
		<Container {...props} className={classNames({ active: loading }, props.className)}>
			<LoaderWrapper>
				<Loader />
			</LoaderWrapper>
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
		backdrop-filter: saturate(0%) blur(3px);
	}
`;

const LoaderWrapper = styled.div`
	position: absolute;
	transform: translate(-50%, -50%);
	left: 50%;
	top: 50%;
`;
