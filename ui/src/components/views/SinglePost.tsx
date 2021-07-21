import { RouteComponentProps } from "../../types/props";
import { Post } from "../../models";
import { SERVER_URL } from "../../utils";
import { useFetch } from "../hooks";
import * as Styles from "../styled-components";
import { ReadOnlyEditor } from "../partials/editor";
import useTitle from "../hooks/useTitle";

interface MatchParams {
	id: string;
	title?: string;
}

export function SinglePost({ match }: RouteComponentProps<MatchParams>) {
	const query = useFetch<{ data: Post }>(`${SERVER_URL}/api/posts/${match.params.id}`);

	useTitle(`Angelin Blog | ${query.body?.data.title}`);

	if (!query.body) {
		return null;
	}

	return (
		<Styles.Container direction="column">
			<Styles.PostWrapper className="my-4">
				<Styles.H4 className="mb-4">{query.body.data.title}</Styles.H4>
				<ReadOnlyEditor content={query.body.data.body} />
			</Styles.PostWrapper>
		</Styles.Container>
	);
}
