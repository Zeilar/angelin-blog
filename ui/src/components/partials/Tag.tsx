import styled, { css } from "styled-components";
import { Tag as ITag } from "../../models";
import { Row, Span } from "../sc";
import { mdiTagOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";

interface Props {
	tag: ITag;
	[key: string]: any;
}

export function Tag({ tag, ...props }: Props) {
	return (
		<Wrapper {...props} as={Link} to={`/?tags=${tag.name}`}>
			<TagIcon path={mdiTagOutline} />
			<Span>{tag.name}</Span>
		</Wrapper>
	);
}

const TagIcon = styled(Icon)`
	width: 1rem;
	height: 1rem;
	margin-right: 0.25rem;
`;

const Wrapper = styled(Row).attrs({ align: "center" })`
	cursor: pointer;
	user-select: none;
	font-weight: 600;
	${props => css`
		${TagIcon} {
			color: ${props.theme.color.rgb("brand")};
		}
		&:hover {
			${Span} {
				color: ${props.theme.color.rgb("brand")};
			}
		}
	`}
`;
