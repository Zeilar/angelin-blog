import * as Styles from "../../sc";
import * as Errors from "./";

interface Props {
	code: number;
}

export function ErrorPage({ code }: Props) {
	function pageToRender() {
		switch (code) {
			case 401:
				return <Errors.Unauthorized />;
			case 403:
				return <Errors.Forbidden />;
			case 404:
				return <Errors.NotFound />;
			default:
				return <Errors.ServerError />;
		}
	}

	return (
		<Styles.Container className="mt-40" justify="center" align="center">
			{pageToRender()}
		</Styles.Container>
	);
}
