import { useEffect } from "react";
import useTitle from "../hooks/useTitle";
import Editor from "../partials/editor/Editor";
import * as Styles from "../styled-components";

export function CreatePost() {
	useTitle("Angelin Blog | Create Post");

	useEffect(() => {
		function exitHandler(e: BeforeUnloadEvent) {
			e.returnValue = "You have unsaved progress, are you sure you want to exit?";
		}

		window.addEventListener("beforeunload", exitHandler);

		return () => {
			window.removeEventListener("beforeunload", exitHandler);
		};
	}, []);

	return (
		<Styles.Container className="mt-4">
			<Styles.H3>Create new post</Styles.H3>
			<Editor />
		</Styles.Container>
	);
}
