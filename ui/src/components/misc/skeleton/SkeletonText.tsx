import styled from "styled-components";
import { skeleton } from "./";

type ElementType = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Props {
	elementType?: ElementType;
	[key: string]: any;
}

export function SkeletonText({ elementType = "p", ...props }: Props) {
	return (
		<Text {...props} as={elementType}>
			.
		</Text>
	);
}

const Text = styled.p`
	${skeleton}
`;
