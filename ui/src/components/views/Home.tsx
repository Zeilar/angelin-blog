import * as Styles from "../sc";
import { Post } from "../../models";
import { useFetch, useTitle } from "../hooks";
import { Filter } from "../partials";
import { URLHelpers } from "../../utils";
import { RouteComponentProps } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { PostThumbnail } from "../post";
import { PostThumbnailSkeleton } from "../skeleton";
import { ErrorPage } from "./";

export function Home({ location }: RouteComponentProps) {
	const searchQuery = useMemo(() => new URLSearchParams(location.search), [location.search]);
	const postQuery = useFetch<{ data: Post[] }>(URLHelpers.apiPosts(), {
		params: Object.fromEntries([...searchQuery]),
	});
	const posts = postQuery.body?.data.map(post => new Post(post)) ?? [];

	useTitle("Angelin Blog");

	if (postQuery.isError) {
		return <ErrorPage code={postQuery.code} />;
	}

	return (
		<Styles.Container className="my-8">
			<Styles.H1>Angelin Blog</Styles.H1>
			<Filter />
			<Styles.Col className="w-full">
				{postQuery.isLoading
					? Array(5)
							.fill(null)
							.map((_, i) => <PostThumbnailSkeleton className="mt-4 p-4" key={i} />)
					: posts.map(post => (
							<PostThumbnail className="mt-4" post={post} key={post.id} />
					  ))}
			</Styles.Col>
		</Styles.Container>
	);
}
