import { Editor } from "@tiptap/react";
import classnames from "classnames";
import { mdiFormatListBulleted, mdiFormatListNumbered, mdiFormatQuoteClose, mdiXml } from "@mdi/js";
import * as ToolbarStyles from "./_styles";

interface Props {
	editor: Editor | null;
}

export function Toolbar({ editor }: Props) {
	if (!editor) return null;

	return (
		<ToolbarStyles.Wrapper className="mb-2">
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={classnames({ active: editor.isActive("bold") }, "font-bold")}
				title="Bold"
			>
				B
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={classnames({ active: editor.isActive("italic") }, "italic")}
				title="Italic"
			>
				I
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={classnames({ active: editor.isActive("strike") }, "line-through")}
				title="Strike through"
			>
				S
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleCode().run()}
				className={classnames({ active: editor.isActive("code") })}
				title="Code"
			>
				<ToolbarStyles.ToolbarIcon path={mdiXml} />
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={classnames({ active: editor.isActive("paragraph") })}
				title="Paragraph"
			>
				P
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 1 }) })}
				title="Header 1"
			>
				h1
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 2 }) })}
				title="Header 2"
			>
				h2
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 3 }) })}
				title="Header 3"
			>
				h3
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 4 }) })}
				title="Header 4"
			>
				h4
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 5 }) })}
				title="Header 5"
			>
				h5
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				className={classnames({ active: editor.isActive("heading", { level: 6 }) })}
				title="Header 6"
			>
				h6
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={classnames({ active: editor.isActive("bulletList") })}
				title="Bullet list"
			>
				<ToolbarStyles.ToolbarIcon path={mdiFormatListBulleted} />
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={classnames({ active: editor.isActive("orderedList") })}
				title="Ordered list"
			>
				<ToolbarStyles.ToolbarIcon path={mdiFormatListNumbered} />
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={classnames({ active: editor.isActive("codeBlock") })}
				title="Codeblock"
			>
				Code block
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={classnames({ active: editor.isActive("blockquote") })}
				title="Blockquote"
			>
				<ToolbarStyles.ToolbarIcon path={mdiFormatQuoteClose} />
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().unsetAllMarks().run()}
				title="Clear marks"
			>
				Clear marks
			</ToolbarStyles.ToolbarButton>
			<ToolbarStyles.ToolbarButton
				onClick={() => editor.chain().focus().clearNodes().run()}
				title="Clear nodes"
			>
				Clear nodes
			</ToolbarStyles.ToolbarButton>
		</ToolbarStyles.Wrapper>
	);
}
