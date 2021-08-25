import * as Styles from "../styled-components";
import { Post } from "../../models";
import { useFetch, useTitle } from "../hooks";
import PostThumbnail from "../partials/PostThumbnail";
import { ErrorPage, Filter } from "../partials";
import { URLHelpers } from "../../utils";
import { RouteComponentProps } from "react-router-dom";
import { useMemo, useState } from "react";
import { useEffect } from "react";

type Params = Record<string, string>;

export function Home({ location }: RouteComponentProps) {
	const searchQuery = useMemo(() => new URLSearchParams(location.search), [location.search]);
	const [params, setParams] = useState<Params>({});

	useEffect(() => {
		setParams(Object.fromEntries([...searchQuery]));
	}, [searchQuery]);

	const postQuery = useFetch<{ data: Post[] }>(URLHelpers.apiPosts(), { params });
	const posts = postQuery.body?.data.map(post => new Post(post)) ?? [];

	useTitle("Angelin Blog");

	if (postQuery.isError) {
		return <ErrorPage />;
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
