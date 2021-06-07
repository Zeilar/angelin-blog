import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { H1, H2, H6 } from "../styled-components/typography";
import { Post, Tag } from "../../types/models";
import { Link } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
import useFetch from "../hooks/useFetch/useFetch";

export default function Home() {
	const [posts, setPosts] = useState<Post[]>([]);

	const {} = useFetch("http://localhost:3030/api/posts", { params: { test: "helloworld" } });

	useEffect(() => {
		(async () => {
			const response = await fetch("http://localhost:3030/api/posts");
			const data: Post[] | null = await response.json();

			if (data) {
				setPosts(data);
			}
		})();
	}, []);

	return (
		<div>
			<Helmet>
				<title>Angelin Blog</title>
			</Helmet>
			<H1>Blog</H1>
			{posts.map((post: Post) => (
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
