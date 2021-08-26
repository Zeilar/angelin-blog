import { RouteComponentProps } from "../../types/props";
import { Post } from "../../models";
import { useFetch, useTitle } from "../hooks";
import { URLHelpers } from "../../utils";
import { ErrorPage, PostFull } from "../partials";
import { Container } from "../styled-components";

interface MatchParams {
	id: string;
	title?: string;
}

export function SinglePost({ match }: RouteComponentProps<MatchParams>) {
	const query = useFetch<{ data: Post }>(URLHelpers.apiPost(match.params.id));
	const post = query.body?.data;

	useTitle(`Angelin Blog | ${post?.title ?? ""}`);

	if (query.isLoading) {
		return <p>Loading...</p>;
	} else if (query.isError) {
		return <ErrorPage />;
	} else if (!post) {
		// TODO: 404 page
		return <p></p>;
	}

	return (
		<Container className="my-8">
			<PostFull post={new Post(post)} />
		</Container>
	);
}
