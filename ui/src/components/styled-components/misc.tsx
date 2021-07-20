import styled from "styled-components";
import { Post } from "../../models";
import { Color, Shadow, theme } from "../../styles/theme";
import * as Styles from "./";
import dayjs from "dayjs";
import advanced from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(advanced);
dayjs.extend(duration);
dayjs.extend(relativeTime);

export const PostWrapper = styled(Styles.Col)`
	background-color: hsl(${Color.pick("primary").get()});
	border-radius: ${theme.borderRadius}px;
	padding: 1rem;
	box-shadow: ${Shadow.pick("elevateUnder")};
`;

export const PostPreview = styled.article`
	position: relative;
	width: 75%;
	margin-left: auto;
	margin-right: auto;
`;

export const PostPreviewHeader = styled(Styles.H3)`
	&:hover {
		color: hsl(${Color.pick("brand").get()});
	}
`;
