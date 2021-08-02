import { RouteComponentProps } from "../../types/props";
import { Post } from "../../models";
import { useFetch, useTitle } from "../hooks";
import { URLHelpers } from "../../utils";
import { PostFull } from "../partials/PostFull";

interface MatchParams {
	id: string;
	title?: string;
}

export function SinglePost({ match }: RouteComponentProps<MatchParams>) {
	const query = useFetch<{ data: Post }>(URLHelpers.apiPost(match.params.id));
	const post = query.body?.data;

	useTitle(`Angelin Blog | ${post?.title ?? ""}`);

	if (!post) return null;

	return <PostFull post={new Post(post)} />;
}
