import { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";
import Editor from "../partials/editor/Editor";
import { H1 } from "../styled-components";

export function CreatePost() {
	return (
		<div style={{ padding: 15 }}>
			<H1>Create new post</H1>
			<Editor />
		</div>
	);
}
