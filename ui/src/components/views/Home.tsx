import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { H1, H2, H6 } from "../styles/font";

interface Post {
	id: number;
	user_id: number;
	title: string;
	body: string;
	created_at: string;
	updated_at: string;
	tags?: Tag[];
}

interface Tag {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

export default function Home() {
	const [posts, setPosts] = useState<Post[] | []>([]);

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
			<H1>Angelin Blog</H1>
			{posts.map((post: Post) => (
				<pre key={post.id}>
					<H2>{post.title}</H2>
					<H6>{post.body}</H6>
					<p>
						{post.tags?.map((tag: Tag, i) => (
							<span>{tag.name} </span>
						))}
					</p>
					<br />
				</pre>
			))}
		</div>
	);
}
