import * as Styles from "../styled-components";

export function ErrorPage() {
	return (
		<Styles.Container className="mt-20" align="center">
			<Styles.H2>It seems I may have screwed up</Styles.H2>
			<Styles.Row as={Styles.H5} align="center">
				<span>If the issue persists, please contact me at</span>
				<Styles.SecondaryButton className="ml-3">admin@angelin.dev</Styles.SecondaryButton>
			</Styles.Row>
		</Styles.Container>
	);
}
