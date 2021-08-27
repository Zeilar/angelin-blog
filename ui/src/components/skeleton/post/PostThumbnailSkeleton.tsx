import classNames from "classnames";
import { HTMLAttributes } from "react";
import styled from "styled-components";
import * as Styles from "../../sc";
import { SkeletonText } from "../";
import { skeleton } from "../_styles";

export function PostThumbnailSkeleton(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<Styles.PostWrapper
			{...props}
			className={classNames("items-start", props.className)}
			as="article"
		>
			<SkeletonText className="mb-4" size={1} width={8} />
			<SkeletonText size={1.5} />
			<Styles.Row className="mt-4 w-full">
				<SkeletonText className="mr-4" width={5} />
				<SkeletonText width={5} />
			</Styles.Row>
		</Styles.PostWrapper>
	);
}

const PostPreviewHeader = styled(Styles.PostPreviewHeader)`
	${skeleton}
	line-height: 0.7;
	width: 100%;
`;