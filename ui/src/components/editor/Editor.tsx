import { EditorContent, Editor as IEditor } from "@tiptap/react";
import { Toolbar } from ".";
import { IStatus } from "../../types/modals";
import classNames from "classnames";
import { Col, InputError } from "../sc";
import { Prompt } from "react-router-dom";
import { useMemo, useEffect } from "react";

const promptMessage = "You have unsaved progress, are you sure you want to exit?";

interface Props {
	onSubmit?: () => void;
	error?: string | null;
	editor: IEditor | null;
	content?: string;
	status?: IStatus;
	[key: string]: any;
}

export function Editor(props: Props) {
	const body = props.editor?.getHTML() ?? "";
	const originalBody = useMemo(() => props.editor?.getHTML(), [props.editor]);

	useEffect(() => {
		function exitHandler(e: BeforeUnloadEvent) {
			if (!props.editor) return;

			if (originalBody !== body && body.length > 10) {
				e.returnValue = promptMessage;
			}
		}

		window.addEventListener("beforeunload", exitHandler);

		return () => {
			window.removeEventListener("beforeunload", exitHandler);
		};
	}, [props.editor, originalBody, body]);

	if (!props.editor) return null;

	return (
		<>
			<Prompt
				message={promptMessage}
				when={props.status !== "success" && body !== originalBody && body.length > 10}
			/>
			<Col {...props} align="flex-start">
				<Toolbar editor={props.editor} />
				<EditorContent
					className={classNames("editing w-full", { error: Boolean(props.error) })}
					editor={props.editor}
				/>
				{props.error && <InputError message={props.error} className="mt-2" />}
			</Col>
		</>
	);
}
