import { Helmet } from "react-helmet";
import { H1, H2, H6 } from "../styled-components/typography";
import { Post, Tag } from "../../types/models";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch/useFetch";

export default function Home() {
	const query = useFetch<{ data: Post[] }>("http://localhost:3030/api/posts");

	return (
		<div>
			<Helmet>
				<title>Angelin Blog</title>
			</Helmet>
			<H1>Blog</H1>
			{query.isSuccess &&
				query.data &&
				query.data.data.map((post: Post) => (
					<Link key={post.id} to={`/post/${post.id}/${post.title}`}>
						<H2>{post.title}</H2>
						<H6>{post.body}</H6>
						<p>
							{post.tags?.map((tag: Tag) => (
								<span key={tag.id}>{tag.name} </span>
							))}
						</p>
						<br />
					</Link>
				))}
		</div>
	);
}
