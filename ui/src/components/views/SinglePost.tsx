import { useState, useEffect } from "react";
import { RouteComponentProps } from "../../types/props";
import { Post } from "../../types/models";
import { SERVER_URL } from "../../utils/constants";
import { H1, H2 } from "../styled-components/typography";
import { Helmet } from "react-helmet";
import useFetch from "../hooks/useFetch/useFetch";
import styled from "styled-components";
import { Col } from "../styled-components/layout";
import { theme } from "../../styles/theme";

interface MatchParams {
	id: string;
	title?: string;
}

export default function SinglePost({ match }: RouteComponentProps<MatchParams>) {
	const query = useFetch<{ data: Post }>(`${SERVER_URL}/api/posts/${match.params.id}`);

	if (!query.data) {
		return null;
	}

	return (
		<Wrapper as="article">
			<Helmet>
				<title>{query.data.data.title}</title>
			</Helmet>
			<H1>{query.data.data.title}</H1>
			<H2>{query.data.data.body}</H2>
		</Wrapper>
	);
}

const Wrapper = styled(Col)``;
