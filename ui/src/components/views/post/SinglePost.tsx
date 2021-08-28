import { RouteComponentProps } from "../../../types/props";
import { Post } from "../../../models";
import { useFetch, useTitle } from "../../hooks";
import { URLHelpers } from "../../../utils";
import { Container } from "../../sc";
import { PostFull } from "../../post";
import { ErrorPage } from "../";

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
		return <ErrorPage code={query.code} />;
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
