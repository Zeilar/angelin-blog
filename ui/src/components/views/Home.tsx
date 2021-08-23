import * as Styles from "../styled-components";
import { Post } from "../../models";
import { useFetch, useTitle } from "../hooks";
import PostThumbnail from "../partials/PostThumbnail";
import { Filter } from "../partials";
import { URLHelpers } from "../../utils";
import { RouteComponentProps } from "react-router-dom";
import { useMemo } from "react";

export function Home({ location }: RouteComponentProps) {
	const searchQuery = useMemo(() => new URLSearchParams(location.search), [location.search]);
	const params: Record<string, string> = {};

	[...searchQuery].forEach(([key, value]) => {
		params[key] = value;
	});

	const query = useFetch<{ data: Post[] }>(URLHelpers.apiPosts(), { params });
	const posts = query.body?.data.map((post: Post) => new Post(post)) ?? [];

	useTitle("Angelin Blog");

	if (query.isError) {
		return <p>Oh dear something went wrong</p>;
	}

	return (
		<Styles.Container className="my-8">
			<Styles.H1>Angelin Blog</Styles.H1>
			<Filter />
			<Styles.Col className="w-full">
				{posts.map((post: Post) => (
					<PostThumbnail className="mt-4 thumbnail" post={post} key={post.id} />
				))}
			</Styles.Col>
		</Styles.Container>
	);
}
