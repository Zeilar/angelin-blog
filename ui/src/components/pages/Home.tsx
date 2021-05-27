import { useState, useEffect, ReactNode } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

export default function Home() {
	return (
		<div>
			<Helmet>
				<title>Angelin Blog</title>
			</Helmet>
			<h1>Home</h1>
		</div>
	);
}
