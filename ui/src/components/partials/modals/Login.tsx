import { useState, useEffect, RefObject } from "react";
import styled from "styled-components";

interface Props {
	forwardRef: RefObject<HTMLDivElement>;
	active: boolean;
}

export default function Login({ active, forwardRef }: Props) {
	return <div ref={forwardRef}>Login here!</div>;
}
