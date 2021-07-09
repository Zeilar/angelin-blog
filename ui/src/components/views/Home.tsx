import * as Styles from "../styled-components";
import { Post, Tag } from "../../models";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks";
import { ReadOnlyEditor } from "../partials/editor";
import useTitle from "../hooks/useTitle";
import { SERVER_URL } from "../../utils";

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
			{posts.map((post: Post) => (
				<article key={post.id}>
					<Styles.PostWrapper className="mt-4">
						<Styles.H4 as={Link} to={`/post/${post.id}-${post.title}`}>
							{post.title}
						</Styles.H4>
						<ReadOnlyEditor content={post.body} />
						{post.tags.length > 0 && (
							<div className="mt-4">
								{post.tags.map((tag: Tag) => (
									<span key={tag.id}>{tag.name} </span>
								))}
							</div>
						)}
					</Styles.PostWrapper>
				</article>
			))}
		</Styles.Container>
	);
}
