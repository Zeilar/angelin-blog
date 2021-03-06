import { RouteComponentProps } from "../../../types/props";
import { Post } from "../../../models";
import { useFetch, useTitle } from "../../hooks";
import { URLHelpers } from "../../../utils";
import { Container, tablet } from "../../sc";
import { PostFull } from "../../post";
import { ErrorPage } from "../";
import { useMemo } from "react";
import { PostSkeleton } from "../../skeleton";
import styled from "styled-components";

interface MatchParams {
	id: string;
	title?: string;
}

export function SinglePost({ match }: RouteComponentProps<MatchParams>) {
	const query = useFetch<{ data: Post }>(URLHelpers.apiPost(match.params.id));
	const post = useMemo(() => query.body?.data, [query.body?.data]);

	useTitle(query.isSuccess ? `Angelin Blog | ${post?.title}` : "Angelin Blog");

	if (query.isError) {
		return <ErrorPage code={query.code} />;
	}

	return (
		<PostContainer>
			{query.isLoading && <PostSkeleton className="p-4" />}
			{query.isSuccess && post && <PostFull withMenu={true} post={new Post(post)} />}
		</PostContainer>
	);
}

const PostContainer = styled(Container)`
	margin-top: 2rem;
	margin-bottom: 2rem;
	${tablet} {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
`;
