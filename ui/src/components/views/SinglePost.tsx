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
	const { data: post } = useFetch<Post>(`${SERVER_URL}/api/posts/${match.params.id}`);

	if (!post) {
		return null;
	}

	return (
		<Wrapper as="article">
			<Helmet>
				<title>{post.title}</title>
			</Helmet>
			<H1>{post.title}</H1>
			<H2>{post.body}</H2>
		</Wrapper>
	);
}

const Wrapper = styled(Col)``;
