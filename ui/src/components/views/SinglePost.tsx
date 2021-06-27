import { RouteComponentProps } from "../../types/props";
import { Post } from "../../models";
import { SERVER_URL } from "../../utils";
import { Helmet } from "react-helmet";
import { useFetch } from "../hooks";
import * as Styles from "../styled-components";
import { ReadOnlyEditor } from "../partials/editor";

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
		<Styles.Container direction="column" as="article">
			<Helmet>
				<title>{query.body.data.title}</title>
			</Helmet>
			<Styles.H1>{query.body.data.title}</Styles.H1>
			<ReadOnlyEditor content={query.body.data.body} />
		</Styles.Container>
	);
}
