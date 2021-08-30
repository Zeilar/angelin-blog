import classNames from "classnames";
import { HTMLAttributes } from "react";
import * as Styles from "../../sc";
import * as Errors from "./";

interface Props extends HTMLAttributes<HTMLDivElement> {
	code: number;
}

export function ErrorPage({ code, ...props }: Props) {
	function pageToRender() {
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

	return (
		<Styles.Container
			{...props}
			className={classNames("mt-40", props.className)}
			justify="center"
			align="center"
		>
			{pageToRender()}
		</Styles.Container>
	);
}
