import styled, { css } from "styled-components";
import { Tag as ITag } from "../../models";
import { Row, Span } from "../styled-components";
import { mdiTagOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { HTMLAttributes } from "react";
import { useHistory } from "react-router-dom";

interface Props extends HTMLAttributes<HTMLDivElement> {
	tag: ITag;
	[key: string]: any;
}

export function Tag({ tag, ...props }: Props) {
	const { push } = useHistory();
	return (
		<Wrapper {...props} as="span" align="center" onClick={() => push(`/?tag=${tag.name}`)}>
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

const Wrapper = styled(Row)`
	cursor: pointer;
	user-select: none;
	font-weight: 600;
	${props => css`
		&:hover {
			${Span},
			${TagIcon} {
				color: ${props.theme.color.rgb("brand")};
			}
		}
	`}
`;
