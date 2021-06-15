import { RouteComponentProps } from "../../types/props";
import { Post } from "../../types/models";
import { SERVER_URL } from "../../utils";
import { Helmet } from "react-helmet";
import { useFetch } from "../hooks";
import styled from "styled-components";
import { Col, H1, H2 } from "../styled-components";
import { theme } from "../../styles/theme";

interface MatchParams {
	id: string;
	title?: string;
}

export function SinglePost({ match }: RouteComponentProps<MatchParams>) {
	const query = useFetch<{ data: Post }>(`${SERVER_URL}/api/posts/${match.params.id}`, {
		headers: {},
	});

	if (!query.body) {
		return null;
	}

	return (
		<Wrapper as="article">
			<Helmet>
				<title>{query.body.data.title}</title>
			</Helmet>
			<H1>{query.body.data.title}</H1>
			<H2>{query.body.data.body}</H2>
		</Wrapper>
	);
}

const Wrapper = styled(Col)``;
