import { Post } from "../../models";
import * as Styles from "../styled-components";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Tag } from "./";
import { DateHelpers } from "../../utils";

interface Props {
	post: Post;
	[key: string]: any;
}

export default function PostThumbnail({ post, ...props }: Props) {
	return (
		<Styles.PostWrapper
			{...props}
			className={classNames("items-start", props.className)}
			as="article"
		>
			<Styles.P className="muted mb-2">
				{DateHelpers.formatPostDate(post.created_at)}
			</Styles.P>
			<Styles.PostPreviewHeader to={`/post/${post.id}-${post.title}`} as={Link}>
				{post.title}
			</Styles.PostPreviewHeader>
			{post.tags.length > 0 && (
				<Styles.Row className="mt-2">
					{post.tags.map(tag => (
						<Tag className="mr-4" key={tag.id} tag={tag} />
					))}
				</Styles.Row>
			)}
		</Styles.PostWrapper>
	);
}
