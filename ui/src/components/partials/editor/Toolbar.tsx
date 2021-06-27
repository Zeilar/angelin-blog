import styled from "styled-components";
import { Editor } from "@tiptap/react";
import { ToolbarButton, ToolbarIcon } from "./_styles";
import classnames from "classnames";
import { mdiFormatListBulleted, mdiFormatListNumbered, mdiFormatQuoteClose, mdiXml } from "@mdi/js";
import { Row } from "../../styled-components";

interface Props {
	editor: Editor | null;
}

export function Toolbar({ editor }: Props) {
	if (!editor) return null;

	return (
		<Wrapper className="mb-2">
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={classnames({ active: editor.isActive("bold") }, "font-bold")}
			>
				B
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={classnames({ active: editor.isActive("italic") }, "italic")}
			>
				I
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={classnames({ active: editor.isActive("strike") }, "line-through")}
			>
				S
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleCode().run()}
				className={classnames({ active: editor.isActive("code") })}
			>
				<ToolbarIcon path={mdiXml} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={classnames({ active: editor.isActive("paragraph") })}
			>
				P
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 1 }) })}
			>
				h1
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 2 }) })}
			>
				h2
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 3 }) })}
			>
				h3
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 4 }) })}
			>
				h4
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 5 }) })}
			>
				h5
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 6 }) })}
			>
				h6
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={classnames({ active: editor.isActive("bulletList") })}
			>
				<ToolbarIcon path={mdiFormatListBulleted} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={classnames({ active: editor.isActive("orderedList") })}
			>
				<ToolbarIcon path={mdiFormatListNumbered} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={classnames({ active: editor.isActive("codeBlock") })}
			>
				Code block
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={classnames({ active: editor.isActive("blockquote") })}
			>
				<ToolbarIcon path={mdiFormatQuoteClose} />
			</ToolbarButton>
			<ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
				HR
			</ToolbarButton>
			<ToolbarButton onClick={() => editor.chain().focus().setHardBreak().run()}>
				Hard break
			</ToolbarButton>
			<ToolbarButton onClick={() => editor.chain().focus().unsetAllMarks().run()}>
				Clear marks
			</ToolbarButton>
			<ToolbarButton onClick={() => editor.chain().focus().clearNodes().run()}>
				Clear nodes
			</ToolbarButton>
		</Wrapper>
	);
}

const Wrapper = styled(Row)`
	flex-wrap: wrap;
	margin: -1px;
	margin-bottom: 0.25rem;
`;
