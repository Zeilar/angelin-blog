import * as Models from "../../models";
import * as Styles from "../sc";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Tag } from "../partials";
import { DateHelpers, URLHelpers } from "../../utils";

interface Props {
	post: Models.Post;
	[key: string]: any;
}

export function PostThumbnail({ post, ...props }: Props) {
	return (
		<Styles.PostWrapper
			{...props}
			className={classNames("items-start", props.className)}
			as="article"
		>
			<Styles.P className="muted mb-2">
				{DateHelpers.formatPostDate(post.created_at)}
			</Styles.P>
			<Styles.PostPreviewHeader to={URLHelpers.viewPost(post)} as={Link}>
				{post.title}
			</Styles.PostPreviewHeader>
			{post.tags.length > 0 && (
				<Styles.Row className="mt-2">
					{post.tags.map((tag: Models.Tag) => (
						<Tag className="mr-4" key={tag.id} tag={tag} />
					))}
				</Styles.Row>
			)}
		</Styles.PostWrapper>
	);
}
