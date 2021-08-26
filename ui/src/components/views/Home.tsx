import * as Styles from "../styled-components";
import { Post } from "../../models";
import { useFetch, useTitle } from "../hooks";
import { ErrorPage, Filter, PostThumbnail } from "../partials";
import { URLHelpers } from "../../utils";
import { RouteComponentProps } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { PostThumbnailSkeleton } from "../misc";

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
				{postQuery.isLoading
					? Array(5)
							.fill(null)
							.map((_, i) => <PostThumbnailSkeleton className="mt-4" key={i} />)
					: posts.map((post: Post) => (
							<PostThumbnail className="mt-4" post={post} key={post.id} />
					  ))}
			</Styles.Col>
		</Styles.Container>
	);
}
