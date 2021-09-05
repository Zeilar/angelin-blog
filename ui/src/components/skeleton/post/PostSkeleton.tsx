import classNames from "classnames";
import { HTMLAttributes } from "react";
import * as Styles from "../../sc";
import { SkeletonText } from "../";

export function PostSkeleton(props: HTMLAttributes<HTMLDivElement>) {
	function renderParagraph() {
		return (
			<>
				{Array(4)
					.fill(null)
					.map((_, i) => (
						<SkeletonText className="mt-4" key={i} />
					))}
				<SkeletonText className="mt-4" width={25} />
			</>
		);
	}

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
			<Styles.Col className="mt-8 w-full">
				{renderParagraph()}
				<Styles.Col className="mt-8">{renderParagraph()}</Styles.Col>
			</Styles.Col>
		</Styles.PostWrapper>
	);
}
