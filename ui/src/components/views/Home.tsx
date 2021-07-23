import * as Styles from "../styled-components";
import { Post } from "../../models";
import { useFetch } from "../hooks";
import useTitle from "../hooks/useTitle";
import { SERVER_URL } from "../../utils";
import PostThumbnail from "../partials/PostThumbnail";
import { Filter } from "../partials";

export function Home() {
	const query = useFetch<{ data: Post[] }>(`${SERVER_URL}/api/posts`);
	const posts = query.body?.data.map((post: Post) => new Post(post)) ?? [];

	useTitle("Angelin Blog");

	if (query.isError) {
		return <p>Oh dear something went wrong</p>;
	}

	return (
		<Styles.Container className="mt-4">
			<Styles.H1>Blog</Styles.H1>
			<Filter />
			<Styles.Col className="w-full">
				{posts.map((post: Post) => (
					<PostThumbnail className="mt-4" post={post} key={post.id} />
				))}
			</Styles.Col>
		</Styles.Container>
	);
}
