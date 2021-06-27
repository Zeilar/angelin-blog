import { RouteComponentProps } from "../../types/props";
import { Post } from "../../models";
import { SERVER_URL } from "../../utils";
import { Helmet } from "react-helmet";
import { useFetch } from "../hooks";
import * as Styles from "../styled-components";
import { ReadOnlyEditor } from "../partials/editor";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface MatchParams {
	id: string;
	title?: string;
}

export function SinglePost({ match }: RouteComponentProps<MatchParams>) {
	const query = useFetch<{ data: Post }>(`${SERVER_URL}/api/posts/${match.params.id}`);

	if (!query.body) {
		return null;
	}

	return (
		<Styles.Container direction="column">
			<Helmet>
				<title>{query.body.data.title}</title>
			</Helmet>
			<Wrapper>
				<Styles.H3 className="mb-4">{query.body.data.title}</Styles.H3>
				<ReadOnlyEditor content={query.body.data.body} />
			</Wrapper>
		</Styles.Container>
	);
}

const Wrapper = styled(Styles.Col)`
	background-color: rgb(${theme.color.secondary});
	padding: 1rem;
	box-shadow: ${theme.shadow.elevate};
	margin-top: 1rem;
`;
