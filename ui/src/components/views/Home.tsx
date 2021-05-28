import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { H1 } from "../styles/font";

export default function Home() {
	return (
		<div>
			<Helmet>
				<title>Angelin Blog</title>
			</Helmet>
			<H1>Angelin Blog</H1>
		</div>
	);
}
