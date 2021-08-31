import classNames from "classnames";
import { HTMLAttributes } from "react";
import { useTitle } from "../../hooks";
import { Container } from "../../sc";
import * as Errors from "./";

interface Props extends HTMLAttributes<HTMLDivElement> {
	code: number;
}

export function ErrorPage({ code, ...props }: Props) {
	function renderPage() {
		switch (code) {
			case 401:
				return <Errors.Unauthorized />;
			case 403:
				return <Errors.Forbidden />;
			case 404:
				return <Errors.NotFound />;
			case 500:
				return <Errors.ServerError />;
			default:
				return <Errors.ServerError />;
		}
	}

	useTitle(`Angelin Blog | ${code}`);

	return (
		<Container
			{...props}
			className={classNames("mt-40", props.className)}
			justify="center"
			align="center"
		>
			{renderPage()}
		</Container>
	);
}
