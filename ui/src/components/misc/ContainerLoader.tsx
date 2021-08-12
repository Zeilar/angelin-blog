import styled from "styled-components";
import classNames from "classnames";
import { Loader } from "../styled-components";

interface Props {
	loading: boolean;
}

export function ContainerLoader({ loading = false }: Props) {
	return (
		<Container className={classNames({ active: loading })}>
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
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: saturate(100%) blur(2px);
	}
`;

const LoaderWrapper = styled.div`
	position: absolute;
	transform: translate(-50%, -50%);
	left: 50%;
	top: 50%;
`;
