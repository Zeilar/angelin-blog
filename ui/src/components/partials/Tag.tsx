import styled from "styled-components";
import { Tag as ITag } from "../../models";
import { Row, Span } from "../styled-components";
import { mdiTagOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Color, theme } from "../../styles/theme";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	tag: ITag;
	[key: string]: any;
}

export function Tag({ tag, ...props }: Props) {
	return (
		<Wrapper {...props} as="span" align="center">
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
	&:hover {
		${Span},
		${TagIcon} {
			color: hsl(${Color.pick("brand").get()});
		}
	}
`;