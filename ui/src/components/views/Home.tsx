import * as Styles from "../styled-components";
import { Post } from "../../models";
import { useFetch, useTitle } from "../hooks";
import PostThumbnail from "../partials/PostThumbnail";
import { Filter } from "../partials";
import { URLHelpers } from "../../utils";

export function Home() {
	const query = useFetch<{ data: Post[] }>(URLHelpers.apiPosts());
	const posts = query.body?.data.map((post: Post) => new Post(post)) ?? [];

	useTitle("Angelin Blog");

	if (query.isError) {
		return <p>Oh dear something went wrong</p>;
	}

	return (
		<Styles.Container className="my-4">
			<Styles.H1>Angelin Blog</Styles.H1>
			<Filter />
			<Styles.Col className="w-full">
				{posts.map((post: Post) => (
					<PostThumbnail className="mt-4" post={post} key={post.id} />
				))}
			</Styles.Col>
		</Styles.Container>
	);
}
