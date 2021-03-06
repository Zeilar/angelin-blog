import classNames from "classnames";
import { HTMLAttributes } from "react";
import * as Styles from "../../sc";
import { SkeletonText } from "../";

export function PostThumbnailSkeleton(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<Styles.PostWrapper
			{...props}
			className={classNames("items-start", props.className)}
			as="article"
		>
			<SkeletonText className="mb-4" size={0.75} width={8} />
			<SkeletonText size={1.25} />
			<Styles.Row className="mt-4 w-full">
				<SkeletonText className="mr-4" width={5} />
				<SkeletonText width={5} />
			</Styles.Row>
		</Styles.PostWrapper>
	);
}
