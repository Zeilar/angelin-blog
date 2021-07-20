import { Post } from "../../models";
import * as Styles from "../styled-components";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { HTMLAttributes } from "react";
import { Tag } from "./";

interface Props extends HTMLAttributes<HTMLDivElement> {
	post: Post;
	[key: string]: any;
}

export default function PostThumbnail({ post, ...props }: Props) {
	return (
		<Styles.PostWrapper {...props} className={classNames("items-start", props.className)}>
			<Styles.P className="muted mb-2">{dayjs(post.created_at).format("MMMM Do")}</Styles.P>
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
