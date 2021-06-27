import Editor from "../partials/editor/Editor";
import * as Styles from "../styled-components";

export function CreatePost() {
	return (
		<Styles.Container>
			<Styles.H3>Create new post</Styles.H3>
			<Editor />
		</Styles.Container>
	);
}
