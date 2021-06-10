import { useContext } from "react";
import { Helmet } from "react-helmet";
import { H1, H2, H6 } from "../styled-components/typography";
import { Post, Tag } from "../../types/models";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch/useFetch";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
	const { data: posts, isSuccess } = useFetch<Post[]>("http://localhost:3030/api/posts", {
		headers: {},
	});

	return (
		<div>
			<Helmet>
				<title>Angelin Blog</title>
			</Helmet>
			<H1>Blog</H1>
			{isSuccess &&
				posts &&
				posts.map((post: Post) => (
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
