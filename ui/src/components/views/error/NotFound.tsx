import { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";
import { Container, H1, H5 } from "../../sc";

export function NotFound() {
	return (
		<>
			<H1>404</H1>
			<H5>There's nothing here!</H5>
		</>
	);
}
