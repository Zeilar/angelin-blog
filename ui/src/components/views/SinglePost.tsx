import { useState, useEffect } from "react";
import { RouteComponentProps } from "../../types/props";
import * as Types from "../../types/models";
import { SERVER_URL } from "../../utils/constants";
import { H1, H2 } from "../styles/typography";
import { Helmet } from "react-helmet";

interface MatchParams {
	id: string;
	title?: string;
}

export default function SinglePost({ match }: RouteComponentProps<MatchParams>) {
	const [post, setPost] = useState<Types.Post>();

	useEffect(() => {
		(async () => {
			const response = await fetch(`${SERVER_URL}/api/posts/${match.params.id}`);
			const data: Types.Post | null = await response.json();
			if (data) {
				setPost(data);
			}
		})();
	}, []);

	if (!post) {
		return null;
	}

	return (
		<article>
			<Helmet>
				<title>{post.title}</title>
			</Helmet>
			<H1>{post.title}</H1>
			<H2>{post.body}</H2>
		</article>
	);
}
