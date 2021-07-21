import useTitle from "../hooks/useTitle";
import Editor from "../partials/editor/Editor";
import * as Styles from "../styled-components";

export function CreatePost() {
	useTitle("Angelin Blog | Create Post");

	return (
		<Styles.Container className="my-4">
			<Styles.H3 className="mb-5">Create new post</Styles.H3>
			<Editor />
		</Styles.Container>
	);
}
