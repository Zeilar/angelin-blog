import { Helmet } from "react-helmet";
import { H1 } from "../styled-components";
import { Post, Tag } from "../../models";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks";
import { ReadOnlyEditor } from "../partials/editor";

export function Home() {
	const query = useFetch<{ data: Post[] }>("http://localhost:3030/api/posts");

	return (
		<div>
			<Helmet>
				<title>Angelin Blog</title>
			</Helmet>
			<H1>Blog</H1>
			{query.isSuccess &&
				query.body?.data.map((post: Post) => (
					<article key={post.id}>
						<Link to={`/post/${post.id}/${post.title}`}>{post.title}</Link>
						<ReadOnlyEditor content={post.body} />
						<p>
							{post.tags?.map((tag: Tag) => (
								<span key={tag.id}>{tag.name}</span>
							))}
						</p>
						<br />
					</article>
				))}
		</div>
	);
}
