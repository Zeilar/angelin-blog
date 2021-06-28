import { Helmet } from "react-helmet";
import * as Styles from "../styled-components";
import { Post, Tag } from "../../models";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks";
import { ReadOnlyEditor } from "../partials/editor";

export function Home() {
	const query = useFetch<{ data: Post[] }>("http://localhost:3030/api/posts");
	const posts = query.body?.data.map((post: Post) => new Post(post)) ?? [];

	if (query.isError) {
		return <p>Oh dear something went wrong</p>;
	}

	return (
		<Styles.Container className="mt-4">
			<Helmet>
				<title>Angelin Blog</title>
			</Helmet>
			<Styles.H1>Blog</Styles.H1>
			{posts.map((post: Post) => (
				<article key={post.id}>
					<Styles.H4 as={Link} to={`/post/${post.id}-${post.title}`}>
						{post.title}
					</Styles.H4>
					<ReadOnlyEditor content={post.body} />
					<p>
						{post.tags?.map((tag: Tag) => (
							<span key={tag.id}>{tag.name} </span>
						))}
					</p>
					<br />
				</article>
			))}
		</Styles.Container>
	);
}
