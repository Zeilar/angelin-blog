import * as Styles from "../../sc";
import * as Views from "./";

interface Props {
	code: number;
}

export function ErrorPage({ code }: Props) {
	function pageToRender() {
		switch (code) {
			case 401:
				return <Views.Unauthorized />;
			case 403:
				return <Views.Forbidden />;
			case 404:
				return <Views.NotFound />;
			default:
				return <Views.ServerError />;
		}
	}

	return (
		<Styles.Container className="mt-40" justify="center" align="center">
			{pageToRender()}
		</Styles.Container>
	);
}
